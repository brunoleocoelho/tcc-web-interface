import React, { useState, createContext, useEffect } from 'react'
import { themes } from '../utils/constants'
import { getThemeApplied, setThemeToApply } from './InterfaceService'

/**
 * Context para gerenciamento de tema da aplicação
 */
const CustomThemeContext = createContext({theme: themes.light})

/**
 * Provider dos valores de tema
 */
export const CustomThemeProvider = ({ children }) => {
    const themeApplied = getThemeApplied()

    // STATE
    const [theme, setTheme] = useState((themeApplied || themes.light))

    /** Function passada para alteração do tema */
    const changeTheme = (themeName) => {
        setTheme(themes[themeName])
    }

    // componentDidUpdate equivalente
    useEffect(() => {
        setThemeToApply(theme)
    }, [theme])

    return (
        <CustomThemeContext.Provider 
            value={{ theme, changeTheme }}
        >
            { children }
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeContext
