import React from 'react'
import ThemeColorSample from '../../components/ThemeColorsSample'
import PageWrapper from '../../components/PageWrapper'
import ContentWrapper from '../../components/ContentWrapper'

/** Página para exibir as cores dos temas dark e light */
function TemasCores(props) {
    console.log('TemasCores', props)

    const title = "Temas e Cores"
    return (
        <PageWrapper title={title}>
            <ContentWrapper title={title}>
            
                <ThemeColorSample />

            </ContentWrapper>
        </PageWrapper>
    )
}

export default TemasCores
