import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { getNavData } from '../../services/NavigationService';
import CustomThemeContext from '../../services/CustomThemeContext';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';
import HomeContent from './HomeContent';
import SideMenu from '../../components/SideMenu';

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
            label: 'Teste',
            onClick: () => alert('Teste'),
            icon: 'smile-o'
        }
    ]

    return (
        <PageWrapper title="dashboard">
            
            <ContentWrapper title="Dashboard" actions={actions} >

                <HomeContent />

            </ContentWrapper>

        </PageWrapper>
    )
}

export default Home
