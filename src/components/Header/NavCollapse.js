import React, { useState } from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { getNavbarData } from '../../services/InterfaceService'

import './Header.css'

/**
 * Renderiza a lista de menus da Navbar que
 * pode ser 'collapsed' conforme tamanho de tela
 */
function NavCollapse() {
    const { items } = getNavbarData()

    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-2 order-2">
            <Nav className="ml-auto flex-sm-row justify-content-sm-between">
                { items && (items.map(item => {
                    const key = `nav-${item.label.replace(' ', '').toLowerCase()}`

                    switch (item.elemtype) {
                        case 'dropdown':
                            return <NavItemDropdown key={key} {...item} />

                        // case 'link':
                        default:
                            return <NavItemLink key={key} {...item} />
                    }
                })) }
            </Nav>
        </Navbar.Collapse>
    )
}

/**
 * Renderiza um item tipo dropdown do menu da navbar
 */
function NavItemDropdown({ label, items, icon, ...rest }) {
    // SATE
    const [isOpen, setIsOpen] = useState(false)

    const id = `nav-dropdown-${String(label).replace(' ','')}`
    
    const classNavItem = [
        'd-flex flex-md-column flex-lg-row',
        'mt-md-2 mt-lg-auto',
        'text-md-center my-auto'
    ].join(' ')

    const classIconSpan = [
        'mr-0 mr-md-05r-n mb-md-05r-n mb-lg-0',
        (isOpen ? 'menu-max-sm-width' : '' )
    ].join(' ')

    return (
        <Nav.Item className={classNavItem} style={styles.navItemDD}>

            { icon && ( 
                <span 
                    id="icon-ddi" 
                    className={classIconSpan} 
                    style={(isOpen ? styles.navDdIcon : {})}
                >
                    <i className={`fa fa-fw fa-${icon}`}></i>
                </span>
            )}
            
            <NavDropdown 
                style={styles.navDd}
                className="p-0 absolute d-md-flex"
                title={label}
                id={id} 
                active
                onClick={() => setIsOpen(!isOpen)}
            >
                    { items && items.map( (item, idx) => {
                        const { elemtype } = item
                        
                        switch (elemtype) {
                            case 'link':
                                const { label, path, icon, onClick } = item
                                const keyItem = `ddi-${elemtype}-${icon}-${String(label).replace(' ','')}`
                                return (
                                    <NavDropdown.Item 
                                        key={keyItem} 
                                        eventKey={idx} 
                                        onClick={onClick} 
                                        href={path && path}
                                        active={false}
                                    >
                                        { icon && <i className={`fa fa-fw fa-${icon}`}></i> }
                                        { label }
                                    </NavDropdown.Item>
                                )

                            // case 'divider':
                            default:
                                const keyDiv = `ddd-${elemtype}-${idx}`
                                return <NavDropdown.Divider key={keyDiv} />
    
                        }
                    })}
            </NavDropdown>
        </Nav.Item>
    )
}

/**
 * Renderiza um item do menu da navbar
 */
function NavItemLink({ label, path, icon, ...rest }) {
    return (
        <Nav.Link 
            className="text-md-center my-auto"
            style={styles.navLink}
            href={path} 
            {...rest}
        >
            {icon && <i className={'fa fa-fw fa-' + icon}></i>}
            <span>{ label }</span>
        </Nav.Link>
    )
}


// ESTILOS CUSTOMIZADOS
const styles = {
    navLink: {
        fontSize: '12pt',
    },
    navDd: {
        flexGrow: 1
    },
    navItemDD: {
        // display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        color: '#ffffff80'
    },
}

export default NavCollapse
