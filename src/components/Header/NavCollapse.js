import React, { useState } from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { getNavbarData } from '../../services/InterfaceService'
import { themes } from '../../services/Constants'

import './Header.css'
import Avatar from '../Avatar'
import { getUser } from '../../services/AuthenticationService'

/**
 * Renderiza a lista de menus da Navbar que
 * pode ser 'collapsed' conforme tamanho de tela
 */
function NavCollapse(props) {
    const { isLoginPage, theme } = props
    
    let { items } = getNavbarData()
    
    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-2 order-md-2" >
            <Nav className="ml-auto flex-sm-row justify-content-sm-between">
                { items && (items.map(item => {
                    const key = `nav-${item.label.replace(' ', '').toLowerCase()}`

                    if (isLoginPage && (!item.showNotLogged)) return null

                    switch (item.elemtype) {
                        case 'dropdown':
                            return <NavItemDropdown key={key} {...item} theme={theme} />

                        // case 'link':
                        default:
                            return <NavItemLink key={key} {...item} theme={theme} />
                    }
                })) }
            </Nav>
        </Navbar.Collapse>
    )
}

/**
 * Renderiza um item tipo dropdown do menu da navbar
 */
function NavItemDropdown({ label, items, icon, theme, ...rest }) {
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
        (isOpen ? 'menu-max-sm-width' : '' ),
        // (theme === 'dark' ? 'bg-dark text-light': '')
    ].join(' ')

    // Renderiza o ícone
    const renderDdLabelIcon = () => {
        const renderImg = () => {
            const isUser = (icon === 'user')
            const usr = isUser && getUser()
            console.log("renderDdLabelIcon", {isUser, usr})
            return isUser
                ? (<Avatar 
                    width={24} 
                    userImg={usr && usr.profileImg}
                    style={{display:'unset'}} 
                />)
                : <i className={`fa fa-fw fa-${icon}`}></i>
        }

        return ( 
            <span 
                id="icon-ddi" 
                className={classIconSpan} 
                style={styles.navTheme[theme]}
            >
                { icon && renderImg() }
                <span className="d-md-none d-lg-inline mx-1">
                    { label }
                </span>
            </span>
        )
    }
    
    return (
        <React.Fragment>

        {/* <Nav.Item className={classNavItem} style={styles.navItemDD}> */}

            {/* { icon && ( 
                <span 
                    id="icon-ddi" 
                    className={classIconSpan} 
                    style={styles.navTheme[theme]}
                >
                    <i className={`fa fa-fw fa-${icon}`}></i>
                </span>
            )} */}
            
            <NavDropdown 
                
                className="nav-dd p-0 absolute d-md-flex"
                style={styles.navTheme[theme]}
                title={renderDdLabelIcon()}
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
        {/* </Nav.Item> */}
        </React.Fragment>
    )
}

/**
 * Renderiza um item do menu da navbar
 */
function NavItemLink({ label, path, icon, theme, ...rest }) {
    const customStyle = {...styles.navLink, ...styles.navTheme[theme]}
    
    // removendo propriedades não aceitas pelo Nav.Link
    const rmUnsetProps = ({showNotLogged, ...rest}) => rest
    const otherProps = rmUnsetProps(rest)
    
    return (
        <Nav.Link 
        style={customStyle}
            className="text-md-center my-auto"
            href={path} 
            {...otherProps}
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
        alignItems: 'center',
    },
    navTheme: {...themes}
}

export default NavCollapse
