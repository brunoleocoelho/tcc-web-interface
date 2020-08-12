import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

import CustomThemeContext from '../../services/CustomThemeContext'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'
import NavSideToggler from './NavSideToggler'

import './Header.css'
import { getUser } from '../../services/AuthenticationService'

/** 
 * Menu header principal do topo da página
 */
function Header(props) {
    // PROPS
    const{ pathname } = props.location

    // STATE
    const [isLoginPage, setIsLoginPage] = useState((pathname === '/login'))

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // componentDidUpdate
    useEffect(() => {
        const isLgIn = (pathname === '/login')
        setIsLoginPage(isLgIn)
    }, [ pathname ])

    const user = getUser()
    const themeApply = user ? theme.themeName : 'dark'
    
    // 5 breakpoint sizes (xs, sm, md, large, and xl)
    return (
        <Navbar 
            sticky="top" 
            bg={themeApply} 
            variant={themeApply} 
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
