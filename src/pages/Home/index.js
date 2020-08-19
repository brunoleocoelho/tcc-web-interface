import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';
import UserDashboardSection from '../../components/UserDashboardSection'
import './Home.css'

/**
 * Representa a página inicial
 */
function Home(props) {
    // props
    const { user } = props

    // se não há user redireciona login
    if (!user) return <Redirect to="/login" />

    return (
        <PageWrapper title="Dashboard">
            <ContentWrapper title="Dashboard" /* actions={actions} */ >
                <Container id="home-student" className="p-0 full-height" fluid>
                    <Row id="home-content" className="m-0 text-md-left full-height">
                        <div id="home-body" className="home-body p-0 text-md-left col">
                            <UserDashboardSection />
                        </div>
                    </Row>
                </Container>
            </ContentWrapper>
        </PageWrapper>
    )
}

export default Home
