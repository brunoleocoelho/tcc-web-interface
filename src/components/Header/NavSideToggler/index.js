import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'

import CustomThemeContext from '../../../services/CustomThemeContext'
import SideMenu from '../../SideMenu'
import './NavSideToggler.css'

/**
 * Botão de acionamento do menu lateral
 */
function NavSideToggler(props) {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    return (
        <Button
            variant={theme.themeName}
            title="Opções"
            className="btn-menu"
            onClick={ SideMenu.toggle }
        >
            <i className="fa fa-bars"></i>
        </Button>
    )
}

export default NavSideToggler
