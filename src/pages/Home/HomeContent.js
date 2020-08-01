import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import UserDashboardSection from '../../components/UserDashboardSection'
import './Home.css'

function HomeContent() {
    return (
        <Container id="home-student" className="p-0 full-height" fluid>
            <Row id="home-content" className="m-0 text-md-left full-height">
                <div id="home-body" className="home-body p-0 text-md-left col">
                    <UserDashboardSection />
                </div>
            </Row>
        </Container>
    )
}

export default HomeContent
