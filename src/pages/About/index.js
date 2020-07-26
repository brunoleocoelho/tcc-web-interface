import React from 'react'
import { Container, Button } from 'react-bootstrap';
import { setTitleBarText } from '../../services/InterfaceService';
import LibraryBackground from '../../components/LibraryBackground';


/**
 * Representa a página "Sobre"
 */
function About() {
    setTitleBarText('Sobre')
    return (
        <Container >
            <LibraryBackground />
            
            <Container className="p-3 my-3 bg-light rounded-sm">
                <h3> Sobre este site </h3>
                <p>
                    Este é um projeto de interface <i>web</i> de aplicação de biblioteca acadêmica para o Trabalho de Conclusão de Curso (TCC) de Tecnólogo em Tecnologia da Informação e Comunicação da FAETERJ Petrópolis (Faculdade de Educação Tecnológica do Estado do Rio de Janeiro, desenvolvido por Bruno Coelho com React.
                </p>
                <p>
                    Para mais informações, entrar em contato pelo e-mail: <a href="maito:brunoleocoelho@gmail.com">brunoleocoelho@gmail.com</a>
                </p>
                <Button variant="primary" href="/">
                    <i className="pr-1 fa fa-home"></i> 
                    Voltar a tela inicial
                </Button>
            </Container>
        </Container>
    )
}

export default About
