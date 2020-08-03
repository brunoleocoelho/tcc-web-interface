import React, { useContext } from 'react'
import { Container, Row, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { getNavData } from '../../services/NavigationService';
import CustomThemeContext from '../../services/CustomThemeContext';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';
import SideMenu from '../../components/SideMenu';
import UserDashboardSection from '../../components/UserDashboardSection'
import './Home.css'

/**
 * Representa a página inicial
 */
function Home(props) {
    // props
    const { user } = props

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // se não há user redireciona login
    if (!user) return <Redirect to="/login" />

    const actions = [
        {
            label: 'Teste1',
            onClick: () => alert('Teste1'),
            icon: 'smile-o',
            // variant: 'primary'
        },
        {
            label: 'Teste2',
            onClick: () => alert('Teste2'),
            icon: 'frown-o',
            // variant: 'success'
        },
    ]

    return (
        <PageWrapper title="Dashboard">
            <ContentWrapper title="Dashboard" actions={actions} >
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
