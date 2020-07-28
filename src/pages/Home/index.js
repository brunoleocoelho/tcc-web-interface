import React, { useState, useContext } from 'react'
import { Container, Button, Row, Nav } from 'react-bootstrap';

import { setTitleBarText } from '../../services/InterfaceService';
import { Redirect } from 'react-router-dom';

import CustomThemeContext from '../../services/CustomThemeContext';
import UserSummaryHeader from '../../components/UserSummaryHeader';
import UserDashboardSection from '../../components/UserDashboardSection';
import './Home.css'

/**
 * Representa a página inicial
 */
function Home(props) {
    // console.log("HOME", props)
    setTitleBarText('Home')
    
    // props
    const { user } = props

    // state
    const [showSide, setShowSide] = useState(false)

    // CONTEXT
    const { theme, changeTheme } = useContext(CustomThemeContext)

    // functions
    const toggleSide = () => setShowSide(!showSide)

    // se não há user redireciona login
    if (!user) return <Redirect to="/login" />

    const sideMenus = [
        { title: "Resumo", icon: "bookmark", href:"" },
        { title: "Leituras", icon: "glass", href:"" },
        { title: "Entregas", icon: "warning", href:"" },
        { title: "Reservas", icon: "book", href:"" },
        { title: "Favoritos", icon: "star", href:"" },
        { title: "Histórico", icon: "history", href:"" },
    ]

    return (
        <Container id="home-student" className="p-0 full-height" fluid>

            <Row id="home-content" className="m-0 text-md-left full-height">
                
                {/* START OF SIDE MENU COLLAPSE AND COL-MD-2 */}
                <div id="home-sidemenu" 
                    style={theme.third} 
                    className={`side-menu p-0 col-md-3 col-lg-2 ${showSide ? 'side-hide' : ''}`}
                >
                    {/* BUTTON PARA FECHAR SIDE MENU */}
                    <Button 
                        variant="outline" 
                        title="fechar" 
                        className="side-btn-close mx-0 d-block d-md-none"
                        onClick={toggleSide} 
                        style={theme.second}
                    >
                        <i className="fa fa-close"></i>
                        &nbsp; 
                        Fechar
                    </Button>
                    
                    <div className="side-content">
                        <div className="d-block d-md-none" >
                            <UserSummaryHeader key="user-summary-2" />
                        </div>
                        <Nav className="flex-column">
                            { sideMenus.map((mn, idx) => {
                                const key = `${idx}-${String(mn.title).replace(' ', '-')}`
                                return (
                                    <Nav.Link key={key} href={mn.href} className="side-item p-2" >
                                        <div className="side-item-icon">
                                            <i className={`fa fa-${mn.icon}`}></i>
                                        </div>
                                        <div className="side-item-text">
                                            { mn.title }
                                        </div>
                                    </Nav.Link>
                                )
                            })}
                        </Nav>
                    </div>
                </div>

                {/* HOME DASHBOARD BODY */}
                <div id="home-body" className="home-boddy p-0 text-md-left col">
                    {/* BUTTON PARA ABRIR SIDE MENU */}
                    <Button 
                        variant="outline" 
                        title="Opções" 
                        className="btn-menu" 
                        onClick={toggleSide} 
                        style={theme.second}
                    >
                        <i className="fa fa-bars"></i>
                    </Button>
                    <UserDashboardSection />
                </div>
            </Row>
        </Container>
    )
}

// ESTILOS
const styles = {
    sideMenuContainer : {
        display: 'flex', 
        flexDirection: 'column'
    },
    sideMenuItem: {
        marginBottom: 4, 
        marginTop: 4
    },
}
export default Home
