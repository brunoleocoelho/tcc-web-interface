import React, { useState, createContext } from 'react'
import { themes } from '../services/Constants'

const CustomThemeContext = createContext({theme: themes.light})

export const CustomThemeProvider = ({ children }) => {
    // STATE
    const [theme, setTheme] = useState(themes.light)

    const changeTheme = (themeName) => {
        setTheme(themes[themeName])
    }

    return (
        <CustomThemeContext.Provider 
            value={{ theme, changeTheme }}
        >
            { children }
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeContext
