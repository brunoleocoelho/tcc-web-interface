import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import BookActions from './BookActions'
import './BookCard.css'
import { themes, layouts } from '../../utils/constants'

/**
 * Componente que representa um 
 * card de exibição de um livro
 */
function BookCard(props) {
    // PROPS
    const { actions, book, onClick, theme, layout } = props
    
    // STATE
    // const [book, setBook] = useState(props.book)
    // const [isReserved, setIsReserved] = useState(false)
    
    if (!book) return null
    
    const noImgBook = require('../../assets/img/books-icon.png')
    const cardId = `book-${book.isbn}-${book.id}`
    const isGrid = (layout === layouts.grid)

    const cssCard = `book-container px-md-1 col-12 ${isGrid && 'col-sm-4 col-md-4 col-lg-3 grid'}`
    const cssHeader = `book-header col-3 ${isGrid && 'col-sm-12'}`
    const cssContent = `${isGrid ? 'p-2 px-sm-0 col-sm-12' : 'p-2 cb-text-lg'}`

    // RENDER
    return (
        <Card 
            className={cssCard}
            id={cardId}
            data-toggle="tooltip" 
            data-placement="top" 
            title={`${book.title} - ${book.author}`}
            style={theme.fourth}
            onClick={onClick}
        >
            <Row className="mx-0">
                <Card.Header className={cssHeader}>
                    <Card.Img 
                        variant="top" 
                        className="d-flex h-100 w-auto"
                        src={book.image_url ? book.image_url : noImgBook }
                    />
                </Card.Header>

                <Col className={cssContent}>
                    <Card.Body className="p-1 h-100" >
                        <Card.Title as="div" className="card-book-title">
                            { (isGrid)
                                ? `${book.title.substring(0,40)}${book.title.length > 40 ? '...' : ''}` 
                                : book.title
                            }
                        </Card.Title>

                        <Card.Text>
                            <small className="text-muted"><b>
                                { book.author ? book.author : 'Autor desconhecido' }
                            </b></small>
                            <br />
                            <small className="text-muted">
                                { book.category ? book.category: 'Não categorizado' }
                            </small>
                        </Card.Text>
                        
                        <BookActions actions={actions} theme={theme} book={book} />
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

BookCard.defaultProps = {
    actions: [],
    book: null,
    theme: themes.light,
    layout: layouts.grid
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