import React, {useState} from 'react'
import { Container, Button, Row } from 'react-bootstrap';
import { getAllBooks } from '../services/StorageService'
import ToastCustom from '../components/ToastCustom';
import BookCard from '../components/BookCard';

/**
 * Representa a página inicial
 */
function Home() {
    const { books } = getAllBooks()
    
    return (
        <React.Fragment>
            <div className="p-3 bg-light">
                <Container>
                    <h1> Home Page </h1>

                    <Button variant="success" href="/sobre">Sobre este site</Button>
                    
                    <ToastCustom>
                        Hello Bootstrap Toast from Home!!!
                    </ToastCustom>
                </Container>
            </div>

            <Container>
                <Row>
                    { (books.length > 0) && books.map( bk => {
                        return <BookCard key={bk.id} book={bk} />
                    }) }
                </Row>
            </Container>
        </React.Fragment>
    )
}

// ESTILOS
const styles = {
    headerHome: { }
}

export default Home
