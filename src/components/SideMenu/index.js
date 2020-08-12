import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'

import { setAllBooks } from '../../services/actions/BookActions'
import { getNavData } from '../../services/NavigationService'
import { getAllBooks } from '../../services/api/BookServiceApi'
import CustomThemeContext from '../../services/CustomThemeContext'
import UserSummaryCard from '../UserSummaryCard'
import './SideMenu.css'

// Helper para abrir o menu lateral
let sideMenuToggle = null

/**
 * Rendriza o menu lateral
 */
function SideMenu(props) {
    const { location, books } = props

    // state
    const [showSide, setShowSide] = useState(false)

    // CONTEXT
    const { theme, changeTheme } = useContext(CustomThemeContext)

    // functions
    const toggleSide = () => setShowSide(!showSide)

    /** Action fecha o menu primeiro e executa ação associada */
    const navLinkDfltAction = (action) => {
        toggleSide()
        action && action()
    }

    // componentDidMount equivalente
    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await getAllBooks()
                props.setAllBooks(data)
            }
            catch (error) {
                console.log("[ERRO] SideMenu CDM", error)
            }
        }
        if (books.length === 0) getBooks()
        sideMenuToggle = toggleSide
    }, [])

    const sideMenus = [
        ...getNavData(),
        { 
            label: "Trocar Tema", icon: "adjust", 
            onClick: () => changeTheme(theme.themeName === 'light' ? 'dark':'light')
        }        
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
            <SideOverlay show={showSide} onClick={toggleSide} />
            <UserSummaryCard key="user-summary-2" />
            
            <div className="side-content">

                <Nav className="flex-column">
                    { sideMenus.map((mn, idx) => {
                        const key = `${idx}-${String(mn.label).replace(' ', '-')}`
                        const isActive = (mn.href === location.pathname)

                        return (
                            <NavLink 
                                key={key}
                                to={mn.href || '#'}
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

/** Renderiza o overlay sobreado de preenchimento quando sidemenu aberto */
function SideOverlay({ show, onClick }) {
    const cssClass = `side-overlay ${show ? 'show' : ''}`

    return (
        <div id="side-overlay" 
            className={cssClass}
            onClick={onClick}
        ></div>
    )
}

/** Action (static) para abrir SideMenu através de outros componentes */
SideMenu.toggle = () => sideMenuToggle()

// REDUX
const mapStateToProps = ({ data }) => ({
    books: data.books
})

const mapDispatchToProps = {
    setAllBooks
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SideMenu) )
