import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { cleanGetinfo } from '../../services/actions/GetinfoActions'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'

import './BookInfoModal.css'

/** Modal para informação de livros */
function BookInfoModal(props) {
    const { book } = props.getinfo

    const user = getUser()
    const isStudent = (user.role === 'estudante')

    //CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [show, setShow] = useState((book !== null))

    // function para fechar modal e limpar redux
    const handleClose = () => {
        setShow(false)
        setTimeout(() => props.cleanGetinfo(), 500)
    }

    // componentDidUpdate
    useEffect(() => {
        setShow(book !== null)
    }, [book])

    if (!book) return null

    return (
        <Modal
            size="lg"
            centered
            onHide={handleClose}
            show={show}
            className="book-info-modal"
        >
            <Modal.Header 
                claassName="book-info-header"
                style={theme.fourth}
                closeButton 
            >
                <Modal.Title as="h5">
                    Informações do livro
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={theme.fourth}>
                <Form className="book-info-form">
                    <Form.Row>

                        <Col sm="3">
                            <Form.Group className="image-book">
                                <img src={book.image_url} />
                                { !isStudent && 
                                    <Form.File 
                                        label={(<>
                                            <i className="fa fa-fw fa-file-image-o"/>
                                            Escolha outra imagem
                                        </>)} 
                                        id="image-upload" 
                                        accept="image/*"
                                        onChange={e => console.log(e.target)}
                                    />
                                }
                                <Form.Text></Form.Text>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Row>
                                <Form.Group as={Col} sm="3">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.id } />
                                </Form.Group> 

                                <Form.Group as={Col} sm="9">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.title } />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.author } />
                                </Form.Group> 

                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.publisher } />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.category } />
                                </Form.Group>

                                <Form.Group as={Col} sm="6">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control readOnly={isStudent} value={ book.isbn } />
                                </Form.Group>
                            </Form.Row>
                        </Col>

                    </Form.Row>
                </Form>
            </Modal.Body>

            <Modal.Footer style={theme.fourth}>
                { !isStudent && (<>
                    <Button variant={theme.themeName}>
                        <i className="fa fa-fw fa-pencil"/>
                        Editar
                    </Button>
                    <Button variant={theme.themeName}>
                        <i className="fa fa-fw fa-floppy-o"/>
                        Salvar
                    </Button>
                </>)}
                <Button variant={theme.themeName} onClick={handleClose}>
                    <i className="fa fa-fw fa-close"/>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

// REDUX
const mapStateToProps = ({ getinfo }) => ({
    getinfo
})

const mapDispatchToProps = {
    cleanGetinfo
}

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoModal)
