import React from 'react'
import { Navbar } from 'react-bootstrap'

import './NavToggle.css'

/** 
 * Renderiza o botão de acesso ao menu
 */
function NavToggle({toggleId}) {
    return (
        <Navbar.Toggle 
            className="navtoggle"
            label="Menu" 
            aria-controls={toggleId}
        >
            <i className="fa fa-ellipsis-v"></i>
        </Navbar.Toggle>
    )
}

export default NavToggle
