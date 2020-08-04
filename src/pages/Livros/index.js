import React, { useState, useContext } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';

import { getAllBooks } from '../../services/StorageService'
import BookCard from '../../components/BookCard';
import BookFilters from '../../components/BookFilters';
import CustomThemeContext from '../../services/CustomThemeContext';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';
import { layouts } from '../../utils/constants'

import './Livros.css'
import EmptyContent from '../../components/EmptyContent';

/**
 * Representa a página de seleção e filtro de livros
 */
function Livros(props) {

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // PROPS
    const { user } = props
    const { books } = getAllBooks()

    // STATE
    const [layout, setLayout] = useState(layouts.grid)
    const [filterdBooks, setFilteredBooks] = useState(books)

    const actions = [
        {
            label: 'Busca Avançada',
            onClick: () => alert('BUSCA AVANÇADA'),
            icon: 'search',
            className: '',
        },
        {
            label: 'Filtros',
            onClick: () => alert('FILTER'),
            icon: 'filter',
            className: 'd-md-none',
            // variant: 'primary'
        },
        {
            label: '',
            title: 'Lista',
            onClick: () => setLayout(layouts.list),
            icon: 'list',
            className: 'd-none d-md-block',
            active: (layout === layouts.list)
        },
        {
            label: '',
            title: 'Grade',
            onClick: () => setLayout(layouts.grid),
            icon: 'th',
            className: 'd-none d-md-block',
            active: (layout === layouts.grid),
        },
    ]

    const title = "Livros"
    const subtitle = `Total ${books.length} livros.`

    return (
        <PageWrapper title={title}>
            
            <ContentWrapper title={title} subtitle={subtitle} actions={actions} >

                <Container id="livros-container" fluid>
                    <div className="main-row row">
                        <Col className="livros-col-filter" md={3} xl={2}>
                            <BookFilters />
                        </Col>

                        <Col className="livros-col-content">
                            <div className="row-inner row">
                                {(filterdBooks.length > 0)
                                    ? ( filterdBooks.map(bk => (
                                        <BookCard 
                                            key={bk.id} 
                                            book={bk} 
                                            theme={theme} 
                                            layout={layout}
                                        />
                                    )) ) 
                                    : <EmptyContent />
                                }
                            </div>
                        </Col>
                    </div>
                </Container>
                
            </ContentWrapper>

        </PageWrapper>
    )
}

export default Livros
