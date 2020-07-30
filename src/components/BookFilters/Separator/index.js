import React, { useContext } from 'react'
import CustomThemeContext from '../../../services/CustomThemeContext'

/** Separador 'hr' customizado */
function Separator() {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // Estilo baseado no tema usado
    const styleToUse = {
        borderColor: theme.line,
        margin:'4px 0px'
    }

    return <hr style={styleToUse}/>
}

export default Separator
