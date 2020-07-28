import React, { useContext } from 'react'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'
import './Footer.css'

/**
 * Componente que renderiza um rodapé da aplicação
 */
function Footer() {
    const user = getUser()

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    if (!user) return null
    
    return (
        <div id="app-footer" style={theme.second} className="p-3 mx-0 row">
            <div className="col-12 col-md-4">
                <ul className="">
                    <li>Col-1</li>
                    <li>Col-1</li>
                    <li>Col-1</li>
                </ul>
            </div>

            <div className="col-12 col-md-4">
                <ul className="">
                    <li>Col-2</li>
                    <li>Col-2</li>
                    <li>Col-2</li>
                </ul>
            </div>

            <div className="col-12 col-md-4">
                <ul className="">
                    <li>Col-3</li>
                    <li>Col-3</li>
                    <li>Col-3</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
