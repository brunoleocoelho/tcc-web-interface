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

    //workaround para div App
    const setAppbackground = () => {
        const app = document.querySelector('.App')
        app.style.backgroundColor = theme.primary.backgroundColor
    }

    // componentDidMount equivalente
    useEffect(() => {
        setAppbackground()
    }, [])

    // componentDidUpdate equivalente
    useEffect(() => {
        setAppbackground()
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
