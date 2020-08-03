import React, { useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import AuthorFilter from './AuthorFilter'
import CategoryFilter from './CategoryFilter';
import './BookFilters.css'

/**
 * Componente que renderiza a barra de filtros de livros
 */
function BookFilters() {
    const title = 'Filtros'

    // STATE
    const [modalShow, setModalShow] = useState(false);

    return (
        <React.Fragment>
            <ModalFilters 
                show={modalShow} 
                onHide={() => setModalShow(false)}
                titulo={title}
            >
                <FilterContainer title={title} key="filter-modal" />
            </ModalFilters>
            
            <div className="p-2 d-md-none">
                <Button
                    variant="outline-primary" 
                    onClick={() => setModalShow(true)}
                >
                    <i className={"fa fa-filter"}></i>
                    { title }
                </Button>
            </div>

            <div className="d-none d-md-flex">
                <FilterContainer title={title} key="filter-side" />
            </div>

        </React.Fragment>
    )
}

/**
 * Container contendo os filtros 
 */
function FilterContainer({ title }) {
    return (
        <div>
            <h5 className="d-none d-md-flex">{ title }</h5>

            <AuthorFilter />
            <CategoryFilter />

        </div>
    )
}


function ModalFilters(props) {
    // console.log("modal props", props)
    const { show, onHide, titulo, children } = props

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
