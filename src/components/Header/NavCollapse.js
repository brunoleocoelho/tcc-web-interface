import React, { useState } from 'react'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { getNavbarData, getUserMenu } from '../../services/InterfaceService'
import { getUser } from '../../services/AuthenticationService'
import Avatar from '../Avatar'

import './NavCollapse.css'

/**
 * Renderiza a lista de menus da Navbar que
 * pode ser 'collapsed' conforme tamanho de tela
 */
function NavCollapse(props) {
    // Menu só exibido com usuário
    const user = getUser()
    if (!user) return null

    const { isLoginPage, toggleId, theme = {} } = props
    let { items } = getNavbarData()
    
    return (
        <React.Fragment>

            <Navbar.Collapse id={toggleId} className="order-md-3" >
                <Nav>
                    { items && (items.map(item => {
                        if (isLoginPage && (!item.showNotLogged)) return null
                        
                        const key = `nav-${item.label.replace(' ', '').toLowerCase()}`
                        return (
                            <Nav.Link href={item.path}>
                                { item.icon && 
                                    <i className={'fa fa-fw fa-' + item.icon}></i>
                                }
                                <span>{ item.label }</span>
                            </Nav.Link>
                        )
                    })) }
                </Nav>
    
                <NavUserDropdown user={user} theme={theme} />
            </Navbar.Collapse>

        </React.Fragment>
    )
}

/**
 * Renderiza um item tipo dropdown do menu da navbar
 */
function NavUserDropdown({ user, theme = {} }) {
    // STATE
    const [isOpen, setIsOpen] = useState(false)

    const { label, items } = getUserMenu()
    const idNavuser = `nav-dropdown-${String(label).replace(' ','')}`
    const imgDft = require('../../assets/img/no-image-profile.jpg')

    // Renderiza o ícone
    const renderDdLabelIcon = () => {
        const color = theme.color;
        return (
            <React.Fragment>
                <span id="icon-ddi" className="mr-0 mb-lg-0 dd-icon" >
                    <Avatar 
                        width={28} 
                        userImg={user ? user.profileImg : imgDft}
                        style={{display:'unset'}} 
                    />
                </span>
                <span id="icon-ddi" style={{color}}>
                    { label }
                </span>
            </React.Fragment>
        )
    }
    
    return (
        <NavDropdown 
            id={idNavuser} 
            title={ renderDdLabelIcon() }
            onClick={() => setIsOpen(!isOpen)}
            className="nav-dd order-3"
            active
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
    )
}

/**
 * Renderiza um item do menu da navbar
 */
function NavItemLink({ label, path, icon, theme, ...rest }) {
    const customStyle = {...styles.navLink, ...theme}
    
    // removendo propriedades não aceitas pelo Nav.Link
    const rmUnsetProps = ({showNotLogged, ...rest}) => rest
    const otherProps = rmUnsetProps(rest)
    
    return (
        <Nav.Link 
        style={customStyle}
            // className="text-md-center my-auto"
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
}

export default NavCollapse
