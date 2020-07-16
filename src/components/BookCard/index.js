import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import './BookCard.css'

/**
 * Componente que representa um 
 * card de exibição de um livro.
 */
function BookCard(props) {
    // PROPS
    const { actions, book } = props
    const noImgBook = require('../../assets/img/books-icon.png')
    
    // STATE
    // const [book, setBook] = useState(props.book)
    // const [isReserved, setIsReserved] = useState(false)

    const cardId = `book-${book.isbn}-${book.id}`

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
                <Card.Header className="col-4 col-sm-12" style={styles.cardHeader}>
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
                                { book.author 
                                    ? book.author 
                                    : 'Autor desconhecido' 
                                }
                            </strong>
                            <br />
                            <small className="text-muted">
                                { book.category 
                                    ? book.category
                                    : 'Não categorizado'
                                }
                            </small>
                        </Card.Text>
                    </Card.Body>

                    <BookActions actions={actions} />

                </Col>
            </Row>
            
        </Card>
    )
}

function BookActions({ actions }) {
    const hasActions = (actions && actions.length > 0)

    if (!hasActions) return null

    // Agrupando em 3 botões, mais que isso "collapse"
    return (
        <Row className="p-1 h-25 bg-silver">
            { actions.map((act, idx) => {
                const hasManyActs = (actions.length >= 3)
                const colDfltXsSize = (hasManyActs) ? 4 : 6
                const colGroupType = (hasManyActs && idx > 2)

                if (colGroupType) return null

                return(
                    <Col xs={colDfltXsSize}>
                        <Button
                            variant={act.style}
                            onClik={act.onClik}
                        >
                            { act.title }
                        </Button>
                    </Col>
                )
            }) }
        </Row>
    )

}

// ESTILO CUSTOMIZADO
const styles = {
    cardContainer: {
        // boxShadow: '2px 2px 4px grey',
        border: '1px solid rgba(0,0,0,.4)',
    },
    cardHeader: {
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
    }
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