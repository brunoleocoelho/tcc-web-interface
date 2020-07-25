import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getAllBooks } from '../services/StorageService'
import { setTitleBarText } from '../services/InterfaceService';
import BookCard from '../components/BookCard';
import BookFilters from '../components/BookFilters';

/**
 * Representa a página de seleção e filtro de livros
 */
function Livros() {
    setTitleBarText('Livros')
    const { books } = getAllBooks()

    return (
        <React.Fragment>
            <div className="p-3 bg-light">
                <Container>
                    <h3> Biblioteca Acadêmica - Livros disponíveis </h3>
                </Container>
            </div>

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
        </React.Fragment>
    )
}

export default Livros
