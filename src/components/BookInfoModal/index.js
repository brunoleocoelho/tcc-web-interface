import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { cleanGetinfo } from '../../services/actions/GetinfoActions'
import CustomThemeContext from '../../services/CustomThemeContext'

import './BookInfoModal.css'

/** Modal para informação de livros */
function BookInfoModal(props) {
    const { book } = props.getinfo

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
        setShow((book !== null))
    }, [book])

    if (!book) return null

    return (
        <Modal
            
            centered
            onHide={handleClose}
            show={show}
            className="book-info-modal"
        >
            <Modal.Header closeButton style={theme.fourth}>
                <Modal.Title as="h5">
                    { book.title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={theme.fourth}>
                <img src={book.image_url} height={200} />
                <div className="book-info">
                    <p>Autor: <strong>{ book.author }</strong></p>
                    <p>Categoria: <strong>{ book.category }</strong></p>
                    <p>Editora: <strong>{ book.publisher }</strong></p>
                    <p>ISBN: <strong>{ book.isbn }</strong></p>
                </div>
            </Modal.Body>
            <Modal.Footer style={theme.fourth}>

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
