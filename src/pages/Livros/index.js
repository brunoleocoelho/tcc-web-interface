import React, { useState, useContext } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';

import { getAllBooks } from '../../services/StorageService'
import BookCard from '../../components/BookCard';
import BookFilters from '../../components/BookFilters';
import CustomThemeContext from '../../services/CustomThemeContext';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';

import './Livros.css'

/**
 * Representa a página de seleção e filtro de livros
 */
function Livros(props) {

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // props
    const { user } = props
    const { books } = getAllBooks()

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
        <PageWrapper title="Livros">
            
            <ContentWrapper title="Livros" actions={actions} >

                <Container id="livros-container" fluid>
                    <Row className="main-row">
                        <Col md={3} xl={2}>
                            <BookFilters />
                        </Col>

                        <Col>
                            <div className="row-inner row">
                                {(books.length > 0) && 
                                    books.map(bk => (
                                        <BookCard 
                                            key={bk.id} 
                                            book={bk} 
                                            theme={theme} 
                                        />
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </ContentWrapper>

        </PageWrapper>
    )
}

export default Livros
