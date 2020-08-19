import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'

import { setAllBooks, setAllAuthors, setAllCategories, setAllPublishers } from '../../services/actions/BookActions'
import { getNavData } from '../../services/NavigationService'
import { getAllBooks, getAllAuthors, getAllCategories, getAllPublishers } from '../../services/api/BookServiceApi'
import CustomThemeContext from '../../services/CustomThemeContext'
import UserSummaryCard from '../UserSummaryCard'
import './SideMenu.css'

// Helper para abrir o menu lateral
let sideMenuToggle = null

/**
 * Rendriza o menu lateral
 */
function SideMenu(props) {
    const { location, data, setAllBooks, setAllAuthors, setAllCategories, setAllPublishers } = props
    const { books, authors, categories, publishers } = data

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

    // obtem os livros, autores, categorias, e editoras populando redux
    const getBooks = async () => {
        try {
            const dataBooks = (books.length === 0) && await getAllBooks()
            const dataAuthors = (authors.length === 0) && await getAllAuthors()
            const dataCategs = (categories.length === 0) && await getAllCategories()
            const dataPubls = (publishers.length === 0) && await getAllPublishers()

            dataBooks && setAllBooks(dataBooks)
            dataAuthors && setAllAuthors(dataAuthors)
            dataCategs && setAllCategories(dataCategs)
            dataPubls && setAllPublishers(dataPubls)
        }
        catch (error) {
            console.log("[ERRO] SideMenu CDM", error)
        }
    }

    // function para chamada inicial
    const startMenu = () => {
        getBooks()
        sideMenuToggle = toggleSide
    }
    
    // componentDidMount equivalente
    useEffect(startMenu, [])

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
    data
})

const mapDispatchToProps = {
    setAllBooks, 
    setAllAuthors, 
    setAllCategories,
    setAllPublishers
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SideMenu) )
