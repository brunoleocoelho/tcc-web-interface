import React, { useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import AuthorFilter from './AuthorFilter'
import CategoryFilter from './CategoryFilter';

/**
 * Componente que renderiza a barra de filtros de livros
 */
function BookFilters() {
    const title = 'Filtros'

    // STATE
    const [modalShow, setModalShow] = useState(false);

    // FUNCTIONS
    const filterBody = () => {
        return (
            <Container fluid>
                <h5 className="d-none d-md-flex">{ title }</h5>

                <AuthorFilter />
                <CategoryFilter />

            </Container>
        )
    }

    return (
        <React.Fragment>
            <ModalFilters 
                show={modalShow} 
                onHide={() => setModalShow(false)}
                titulo={title}
            >
                { filterBody() }
            </ModalFilters>
            
            <div className="p-2">
                <Button
                    className="d-md-none"
                    variant="outline-primary" 
                    onClick={() => setModalShow(true)}
                >
                    <i className={"fa fa-filter"}></i>
                    { title }
                </Button>
            </div>

            <div className="d-none d-md-flex">
                { filterBody() }
            </div>

        </React.Fragment>
    )
}


function ModalFilters(props) {
    // console.log("modal props", props)
    const { show, onHide, titulo, children } = props

    if (!children) return null

    return (
        <Modal
            {...props}
            show={show}
            size="lg"
            aria-labelledby="modal-filters"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-filters">
                    { titulo }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { children }
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide}>
                    Feito
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookFilters
