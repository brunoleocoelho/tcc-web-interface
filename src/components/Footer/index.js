import React from 'react'
import './Footer.css'
import { themes } from '../../services/Constants'

/**
 * Componente que renderiza um rodapé da aplicação
 */
function Footer() {
    const thm = 'light'

    return (
        <div 
            id="app-footer" 
            style={themes[thm]}
            // className=""
        >

        </div>
    )
}

export default Footer
