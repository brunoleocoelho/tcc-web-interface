import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { Navbar } from 'react-bootstrap'
import NavCollapse from './NavCollapse'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'
import NavToggle from './NavToggle'

import './Header.css'
import CustomThemeContext from '../../services/CustomThemeContext'

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

    const themeApply = theme.fourth
    const toggleId = "responsive-navbar"
    
    // 5 breakpoint sizes (xs, sm, md, large, and xl)
    return (
        <Navbar 
            sticky="top" 
            expand="md" 
            bg={theme.themeName} 
            variant={theme.themeName} 
            collapseOnSelect
            expanded={isNavShown}
            onToggle={e => setIsNavShown(e)}
            className="navbartop"
            // style={themeApply}
        >
            {(isLoginPage) 
                ? (
                    <React.Fragment>
                        <NavBrand />
                        <NavCollapse isLoginPage={false} theme={themeApply} {...props} />
                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <NavBrand />
                        <NavSearch theme={themeApply}/>
                        <NavToggle toggleId={toggleId} />
                        <NavCollapse toggleId={toggleId} theme={themeApply}/>
                    </React.Fragment>
                )
            }
        </Navbar>
    )
}

export default withRouter(Header)
