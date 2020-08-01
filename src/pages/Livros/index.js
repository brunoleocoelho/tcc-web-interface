import React, { useState, useContext } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';

import { getAllBooks } from '../../services/StorageService'
import BookCard from '../../components/BookCard';
import BookFilters from '../../components/BookFilters';
import CustomThemeContext from '../../services/CustomThemeContext';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';

/**
 * Representa a página de seleção e filtro de livros
 */
function Livros(props) {

    // CONTEXT
    // const { theme, changeTheme } = useContext(CustomThemeContext)
    
    // props
    const { user } = props
    const { books } = getAllBooks()

    return (
        <PageWrapper title="livros">
            
            <ContentWrapper title="Livros" actions={[]} >

                <Container fluid>
                    <Row className="p-1">
                        <Col md={3} xl={2}>
                            <BookFilters />
                        </Col>

                        <Col>
                            <Row className="p-md-2 p-xl-4">
                                {(books.length > 0) && 
                                    books.map(bk => {
                                        return <BookCard key={bk.id} book={bk} />
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </ContentWrapper>

        </PageWrapper>
    )
}

export default Livros
