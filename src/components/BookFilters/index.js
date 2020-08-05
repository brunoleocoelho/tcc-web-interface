import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Modal } from 'react-bootstrap'

import { cleanFilters } from '../../services/actions';
import AuthorFilter from './AuthorFilter'
import CategoryFilter from './CategoryFilter';
import ModalFilters from './ModalFilters';

import './BookFilters.css'

// Helper para abertura de modal de filters
let showModal = null

/**
 * Componente que renderiza a barra de filtros de livros
 */
function BookFilters(props) {
    const title = 'Filtros'
    const maxWidthScreen = 768
    const innerWidth = window.innerWidth

    // STATE
    const [modalShow, setModalShow] = useState(false);
    
    // Ação de abrir e fechar modal
    const toggleShowModal = () => setModalShow(!modalShow)

    // componentDidMount
    useEffect(() => {
        showModal = toggleShowModal
    }, [])

    // Renderiza em formato modal para telas pequenas
    if (innerWidth <= maxWidthScreen) {
        const modalActions = [
            { label: 'Feito', variant: '', onClick: toggleShowModal, icon: 'check' },
            { label: 'Limpar', variant: '', onClick: props.cleanFilters, icon: 'eraser' },
        ]

        return (
            <ModalFilters 
                show={modalShow} 
                actions={modalActions}
                title={title}
            >
                <FilterContainer title={title} key="filter-modal" />
            </ModalFilters>
        )
    }

    return (
        <div className="d-none d-md-block">
            <FilterContainer title={title} key="filter-side" />
        </div>
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

// Static function para abertura do modal por outros componentes
BookFilters.showModal = () => showModal()

// REDUX
const mapStateToProps = ({ bookFilters }) => ({
    bookFilters
})

const mapDispatchToProps = {
    cleanFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(BookFilters)
