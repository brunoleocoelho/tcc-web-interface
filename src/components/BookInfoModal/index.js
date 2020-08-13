import React, { useState, useEffect, useContext, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { cleanGetinfo } from '../../services/actions/GetinfoActions'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'

import './BookInfoModal.css'

/** Modal para informação de livros */
function BookInfoModal(props) {

    const user = getUser()
    const isStudent = (user.role === 'estudante')

    //CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [show, setShow] = useState((props.book !== null))
    const [book, setBook] = useState(props.book)
    const [toEdit, setToEdit] = useState(false)
    const [msgImg, setMsgImg] = useState('')

    // REF
    const imgRef = useRef()

    // verifica se houve modificações de edição
    const checkChanges = () => {
        // Verifcando igualdade simples dos objetos
        const bookProps = JSON.stringify(props.book)
        const bookHere = JSON.stringify(book)
        const isEqual = (bookProps === bookHere);

        const goAhead = isEqual || window.confirm("As modificações serão perdidas. Continuar?")

        return goAhead
    }

    // function para fechar modal e limpar redux
    const handleClose = () => {
        const goAhead = checkChanges()
        if (goAhead) {
            setShow(false)
            setToEdit(false)
            setMsgImg('')
            // setTimeout(() => props.cleanGetinfo(), 500)
            setTimeout(() => setBook(null), 500)
        }
    }

    // function que habilita editar item
    const handleToEdit = () => {
        const goAhead = checkChanges()
        if (!goAhead) return
        setBook(props.book)
        setToEdit(!toEdit)
        setMsgImg('')
    }

    // manuseia as alterações nos campos
    const handleOnChange = (e) => {
        const prop = e.target.name
        const value = e.target.value
        setBook({...book, [prop]: value})
    }

    // manueria a alteração da imagem
    const imgTypes = ["image/bmp","image/jpeg","image/png"]
    const handleImg = (e) => {
        const inputFile = e.target
        const prop = inputFile.name
        const files = inputFile.files
        console.log("handleImg", {inputFile, files, imgRef})
        
        const imgFile = files['0']
        const isValid = imgTypes.includes(imgFile.type)
        if (!isValid) {
            setMsgImg(`O formato '${imgFile.type}' do arquivo '${imgFile.name}' é inválido!.`)
            return
        }
        if (imgRef) {
            const imgUrl = URL.createObjectURL(imgFile)
            imgRef.current.src = imgUrl
            setBook({...book, [prop]: imgUrl})
            setMsgImg(`Nova imagem '${imgFile.name}'.`)
        }
    }

    // componentDidUpdate
    useEffect(() => {
        const isReady = (props.book !== null)
        setShow(isReady)
        isReady && setBook(props.book)
    }, [props.book])


    // SE NÃO HOUVER LIVRO NÃO REDENRIZA
    if (!book) return null

    // estilo dos inputs
    const styleApply = (!toEdit) ? theme.second : {}
    const imgBtnInner = (
        <div className="inner-btn">
            <i className="fa fa-fw fa-file-image-o"/>
            Trocar imagem
        </div>
    )

    // botões de ação do formulário
    const actionButtons = (<>
        { !isStudent && (<>
            <Button variant={theme.themeName} onClick={handleToEdit}>
                <Link to={`/livros/info/${book.id}`} >
                    <i className="fa fa-fw fa-pencil"/>
                    Editar
                </Link>
            </Button>
            <Button variant={theme.themeName} disabled={!toEdit}>
                <i className="fa fa-fw fa-floppy-o"/>
                Salvar
            </Button>
        </>)}
    </>)

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
                <Modal.Title >
                    Informações do livro
                    <div className="actions-header">
                        { actionButtons }
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={theme.fourth}>
                <Form className="book-info-form">
                    <Form.Row>

                        <Col sm="3">
                            <Form.Group className="image-book">
                                <img ref={imgRef} id="imgbook" src={book.image_url} />
                                { (!isStudent && toEdit) &&
                                    <Form.File 
                                        label={imgBtnInner} 
                                        disabled={!toEdit}
                                        name="image_url"
                                        id="image-upload" 
                                        accept={imgTypes.join(',')}
                                        onChange={handleImg}
                                        multiple={false}
                                    />
                                }
                                
                                <Form.Text><small>{ msgImg }</small></Form.Text>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Row>
                                <Form.Group as={Col} sm="3">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="id"
                                        readOnly={!toEdit}
                                        value={ book.id }
                                        style={styleApply}/>
                                </Form.Group> 

                                <Form.Group as={Col} sm="9">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="title"
                                        readOnly={!toEdit}
                                        value={ book.title }
                                        style={styleApply}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="author"
                                        readOnly={!toEdit}
                                        value={ book.author }
                                        style={styleApply}/>
                                </Form.Group> 

                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="publisher"
                                        readOnly={!toEdit}
                                        value={ book.publisher }
                                        style={styleApply}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm="6">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="category"
                                        readOnly={!toEdit}
                                        value={ book.category }
                                        style={styleApply}/>
                                </Form.Group>

                                <Form.Group as={Col} sm="6">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control 
                                        onChange={handleOnChange}
                                        name="isbn"
                                        readOnly={!toEdit}
                                        value={ book.isbn }
                                        style={styleApply}/>
                                </Form.Group>
                            </Form.Row>
                        </Col>

                    </Form.Row>
                </Form>
            </Modal.Body>

            <Modal.Footer style={theme.fourth} className="actions-footer">
                { actionButtons }
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
