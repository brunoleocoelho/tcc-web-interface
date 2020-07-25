import React, { useState } from 'react'
import { Container, Button, Row, Col, Badge, Navbar, Nav } from 'react-bootstrap';
import { getAllBooks } from '../services/StorageService'
import { setTitleBarText } from '../services/InterfaceService';
import { Redirect } from 'react-router-dom';
import Avatar from '../components/Avatar';
import UserSummaryHeader from '../components/UserSummaryHeader';
import UserDashboardSection from '../components/UserDashboardSection';

import './Home.css'

/**
 * Representa a página inicial
 */
function Home(props) {
    console.log("HOME", props)
    setTitleBarText('Home')
    
    // props
    const { user } = props

    // state
    const [showSide, setShowSide] = useState(false)

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
        <Container className="p-0" fluid>

            <div className="d-none d-md-block" >
                <UserSummaryHeader key="user-summary-1" />
            </div>
            
            <Row className="m-0 text-md-left">

                {/* SIDE MENU COLLAPSE AND COL-MD-2 */}
                <div className={`side-menu p-2 col-md-2 ${showSide ? 'side-hide' : ''}`}>

                    <div className="side-content">
                        <div className="d-block d-md-none" >
                            <UserSummaryHeader key="user-summary-2" />
                        </div>
                        
                        <Nav className="flex-column">
                            { sideMenus.map((mn, idx) => {
                                const key = `${idx}-${String(mn.title).replace(' ', '-')}`
                                return (
                                    <Nav.Link key={key} href={mn.href} className="p-2" >
                                        <i className={`fa fa-${mn.icon}`}></i>
                                        &nbsp;
                                        { mn.title }
                                    </Nav.Link>
                                )
                            })}
                        </Nav>
                    </div>

                    <Button 
                        variant="outline" 
                        title="fechar" 
                        className="bg-light side-btn-close mx-0 d-block d-md-none" 
                        onClick={toggleSide} 
                    >
                        <i className="fa fa-close"></i>
                        &nbsp; 
                        Fechar
                    </Button>
                </div>

                {/* MAIN HOME DASHBOARD */}
                <div className="p-2 text-md-left col">
                    <Button 
                        variant="outline" 
                        title="Opções" 
                        className="position-absolute d-md-none" 
                        onClick={toggleSide} 
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
    }
}
export default Home
