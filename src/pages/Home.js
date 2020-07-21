import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getAllBooks } from '../services/StorageService'
import { setTitleBarText } from '../services/InterfaceService';
import ToastCustom from '../components/ToastCustom';
import BookCard from '../components/BookCard';
import BookFilters from '../components/BookFilters';

/**
 * Representa a página inicial
 */
function Home() {
    setTitleBarText('Home')
    const { books } = getAllBooks()

    return (
        <React.Fragment>
            <HomeHeader />

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

/** TopHeader para HomePage */
function HomeHeader() {
    return (
        <div className="p-3 bg-light">
            <Container>
                <h3> Biblioteca Acadêmica </h3>

                <Button variant="success" href="/sobre">Sobre este site</Button>

                <ToastCustom>
                    Hello Bootstrap Toast from Home!!!
                </ToastCustom>
            </Container>
        </div>
    )
}

export default Home
