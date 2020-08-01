import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

import CustomThemeContext from '../../services/CustomThemeContext'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'
import NavSideToggler from './NavSideToggler'

import './Header.css'

/** 
 * Menu header principal do topo da página
 */
function Header(props) {
    // PROPS
    const{ pathname } = props.location

    // STATE
    const [isNavShown, setIsNavShown] = useState(false)
    const [isLoginPage, setIsLoginPage] = useState((pathname === '/login'))

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // componentDidUpdate
    useEffect(() => {
        const isLgIn = (pathname === '/login')
        setIsLoginPage(isLgIn)
    }, [ pathname ])

    const toggleId = "responsive-navbar"
    
    // 5 breakpoint sizes (xs, sm, md, large, and xl)
    return (
        <Navbar 
            sticky="top" 
            bg={theme.themeName} 
            variant={theme.themeName} 
            className="navbartop"
        >
            {(isLoginPage) 
                ? (
                    <React.Fragment>
                        <NavBrand />
                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <NavSideToggler />
                        <NavBrand />
                        <NavSearch />
                    </React.Fragment>
                )
            }
        </Navbar>
    )
}

export default withRouter(Header)
