import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { getNavbarData } from '../../services/InterfaceService'

/**
 * Renderiza a lista de menus da Navbar que
 * pode ser 'collapsed' conforme tamanho de tela
 */
function NavCollapse() {
    const { items } = getNavbarData()

    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-2 order-2">
            <Nav className="ml-auto flex-sm-row justify-content-sm-between">
                { items && items.map(item => {
                    const key = `nav-${item.label.replace(' ', '').toLowerCase()}`
                    return (
                        <Nav.Link 
                            className="text-md-center my-auto"
                            style={styles.navLink}
                            href={item.path} 
                            key={key} 
                        >
                            <i className={'fa fa-fw fa-' + item.icon}></i>
                            <span>{item.label}</span>
                        </Nav.Link>
                    )
                }) }
            </Nav>
        </Navbar.Collapse>
    )
}

// ESTILOS CUSTOMIZADOS
const styles = {
    navLink: {
        fontSize: '12pt',
    }
}

export default NavCollapse
