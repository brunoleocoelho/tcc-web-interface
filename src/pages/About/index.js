import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import CustomThemeContext from '../../services/CustomThemeContext';
import LibraryBackground from '../../components/LibraryBackground';
import PageWrapper from '../../components/PageWrapper';
import './About.css'

/**
 * Representa a página "Sobre"
 */
function About() {

    const { theme } = useContext(CustomThemeContext)
    const imgLogo = require('../../assets/img/books-icon.png')

    return (
        <PageWrapper title="Sobre">
            <Container id="about-page" className="py-4 rounded-sm">
                <LibraryBackground />
            
                <Row>
                    <Col sm={3}>
                        <div className="content-place logo" style={theme.fourth}>
                            <img src={imgLogo} width={200} alt="book-logo-img" />
                        </div>
                    </Col>
                    <Col>
                        <div className="content-place sobre" style={theme.fourth}>
                            <h3> Sobre este Projeto </h3>
                            <p>
                                Este é um projeto de interface <i>web</i> de aplicação de biblioteca acadêmica para o Trabalho de Conclusão de Curso (TCC) de Tecnólogo em Tecnologia da Informação e Comunicação da FAETERJ Petrópolis (Faculdade de Educação Tecnológica do Estado do Rio de Janeiro, desenvolvido por Bruno Coelho com React.
                            </p>
                            <p>
                                Para mais informações, entrar em contato pelo e-mail: <a href="maito:brunoleocoelho@gmail.com">brunoleocoelho@gmail.com</a>
                            </p>
                            <Button as={Link} variant={theme.themeName} to="/">
                                <i className="pr-1 fa fa-home"></i> 
                                Voltar a tela inicial
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </PageWrapper>
    )
}

export default About
