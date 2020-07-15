import React from 'react'
import { Navbar } from 'react-bootstrap'
import { getNavbarData } from '../../services/InterfaceService'

/**
 * Componente do logotipo e titulo da navbar
 */
function NavBrand() {
    // Logotipo extraído da plataforma ADAZING, com ícones gratuitos, e renomeado para 'books-icon.png'.
    // URL: https://www.adazing.com/wp-content/uploads/2019/02/stacked-book-clipart-07-300x300.png 
    const logo = require('../../assets/img/books-icon.png')
    const { title } = getNavbarData()

    return (
        <Navbar.Brand className="mx-2 order-1" href="/">
            <img
                src={logo}
                alt={'logo'}
                width="30"
                height="30"
            />
            <span style={styles.navBrandText} >
                { title || 'Biblioteca' }
            </span>
        </Navbar.Brand>
    )
}

// ESTILOS CUSTOMIZADOS
const styles = {
    grow: {
        flexGrow: 1,
    },
    navBrandText: {
        fontSize: 22,
    },
}

export default NavBrand
