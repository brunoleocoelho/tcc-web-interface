import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'

import { getNavData } from '../../services/NavigationService'
import CustomThemeContext from '../../services/CustomThemeContext'
import UserSummaryCard from '../UserSummaryCard'
import './SideMenu.css'
import { doLogout } from '../../services/InterfaceService'

// Helper para abrir o menu lateral
let sideMenuToggle = null

/**
 * Rendriza o menu lateral
 */
function SideMenu(props) {
    const { location } = props

    // state
    const [showSide, setShowSide] = useState(false)

    // CONTEXT
    const { theme, changeTheme } = useContext(CustomThemeContext)

    // functions
    const toggleSide = () => setShowSide(!showSide)

    const navLinkDfltAction = (action) => {
        toggleSide()
        action && action()
    }

    // componentDidMount equivalente
    useEffect(() => {
        sideMenuToggle = toggleSide
    }, [])

    const sideMenus = [
        ...getNavData(),
        { 
            label: "Trocar Tema", icon: "adjust", 
            onClick: () => {
                changeTheme(theme.themeName === 'light' ? 'dark':'light')
            }
        },
        { 
            label: "Sair", icon: "sign-out", onClick: doLogout
        },
        
    ]

    const sideMenuCss = [
        'side-menu col-md-3 col-xl-2',
        (showSide ? 'side-hide' : '')
    ].join(' ')

    return (
        <div id="side-menu" 
            style={theme.third} 
            className={sideMenuCss}
        >
            <UserSummaryCard key="user-summary-2" />
            
            <div className="side-content">

                <Nav className="flex-column">
                    { sideMenus.map((mn, idx) => {
                        const key = `${idx}-${String(mn.label).replace(' ', '-')}`
                        const isActive = (mn.href === location.pathname)

                        return (
                            <NavLink 
                                key={key}
                                to={mn.href || '/'}
                                onClick={() => navLinkDfltAction(mn.onClick)}
                                className="side-item p-2"
                                style={isActive ? theme.primary : {}}
                            >
                                <div className="side-item-icon">
                                    <i className={`fa fa-${mn.icon}`}></i>
                                </div>
                                <div className="side-item-text">
                                    { mn.label }
                                </div>
                            </NavLink>
                        )
                    })}
                </Nav>
            </div>

            <Button 
                variant="outline" 
                title="fechar" 
                className="side-btn-close"
                onClick={toggleSide} 
                style={theme.second}
            >
                <i className="fa fa-close"></i>
                &nbsp; 
                Fechar
            </Button>
        </div>
    )
}

/** Action para abrir SideMenu através de outros componentes */
SideMenu.toggle = () => sideMenuToggle()

export default withRouter(SideMenu)
