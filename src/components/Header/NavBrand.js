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
        <Navbar.Brand className="mx-2" href="/">
            <img
                src={logo}
                alt={'logo'}
                width="30"
                height="30"
            />
            <span className="navbartext">
                { title || 'Biblioteca' }
            </span>
        </Navbar.Brand>
    )
}

export default NavBrand
