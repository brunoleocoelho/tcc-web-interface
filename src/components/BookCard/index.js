import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import BookActions from './BookActions'
import './BookCard.css'

/**
 * Componente que representa um 
 * card de exibição de um livro
 */
function BookCard(props) {
    // PROPS
    const { actions, book } = props
    const noImgBook = require('../../assets/img/books-icon.png')
    const cardId = `book-${book.isbn}-${book.id}`
    
    // STATE
    // const [book, setBook] = useState(props.book)
    // const [isReserved, setIsReserved] = useState(false)

    // RENDER
    return (
        <Card 
            className="book-container col-12 col-sm-4 col-md-3 col-lg-2 px-md-1"
            id={cardId}
            data-toggle="tooltip" 
            data-placement="top" 
            title={`${book.title} - ${book.author}`}
        >
            <Row className="mx-0">
                <Card.Header className="book-header col-4 col-sm-12">
                    <Card.Img 
                        variant="top" 
                        className="d-flex h-100 w-auto"
                        src={book.image_url ? book.image_url : noImgBook }
                    />
                </Card.Header>

                <Col className="px-0 col-sm-12">
                    <Card.Body className="p-1 h-75" >
                        <Card.Title as="h6" className="h6 text-truncate">
                            { book.title }
                        </Card.Title>

                        <Card.Text>
                            <strong className="text-muted" >
                                { book.author ? book.author : 'Autor desconhecido' }
                            </strong>
                            <br />
                            <small className="text-muted">
                                { book.category ? book.category: 'Não categorizado' }
                            </small>
                        </Card.Text>
                    </Card.Body>

                    <BookActions actions={actions} />
                </Col>
            </Row>
        </Card>
    )
}

export default BookCard

/* BOOK MODEL
    id
    title
    publisher
    isbn
    image_url
    author
    category
*/