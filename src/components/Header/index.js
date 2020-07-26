import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import NavCollapse from './NavCollapse'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'
import NavToggle from './NavToggle'

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
    const [theme, setTheme] = useState('light')

    const toggleId = "responsive-navbar"

    // componentDidUpdate
    useEffect(() => {
        const isLgIn = (pathname === '/login')
        setIsLoginPage(isLgIn)
    }, [ pathname ])

    // 5 breakpoint sizes (xs, sm, md, large, and xl)
    return (
        <Navbar 
            sticky="top" 
            expand="md" 
            bg={theme} 
            variant={theme} 
            collapseOnSelect
            expanded={isNavShown}
            onToggle={e => setIsNavShown(e)}
            className="navbartop"
        >
            {(isLoginPage) 
                ? (
                    <React.Fragment>
                        <NavBrand />
                        <NavCollapse isLoginPage={false} theme={theme} {...props} />
                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <NavBrand />
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        <NavSearch theme={theme}/>
                        <NavToggle toggleId={toggleId} />
                        <NavCollapse toggleId={toggleId} theme={theme}/>
                    </React.Fragment>
                )
            }
        </Navbar>
    )
}

export default withRouter(Header)
