import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'
import './ThemeButton.css'

/** 
 * FLOAT BUTTON PARA MUDANÇA DE TEMA DE CORES
 */
function ThemeButton() {
    const user = getUser()
    // CONTEXT
    const { theme, changeTheme } = useContext(CustomThemeContext)

    if (!user) return null
    
    // theme para botão de alteração de tema geral
    const btnTheme = (theme.themeName ==='light') ? 'dark' : 'light'
    
    return (
        <Button 
            id="btn-change-theme"
            title={`Alterar para tema '${btnTheme}'`}
            className="btn-theme" 
            onClick={() => changeTheme(btnTheme)}
            variant={btnTheme}
        >
            <i className="fa fa-adjust"></i>
        </Button>
    )
}

export default ThemeButton
