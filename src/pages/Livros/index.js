import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';

import { getAllBooks } from '../../services/StorageService'
import CustomThemeContext from '../../services/CustomThemeContext';
import { cleanFilters } from '../../services/actions/BookFilterActions'
import BookCard from '../../components/BookCard';
import BookFilters from '../../components/BookFilters';
import ContentWrapper from '../../components/ContentWrapper';
import PageWrapper from '../../components/PageWrapper';
import EmptyContent from '../../components/EmptyContent';
import LoadingLocal from '../../components/LoadingLocal';
import { layouts } from '../../utils/constants'

import './Livros.css'

/**
 * Representa a página de seleção e filtro de livros
 */
function Livros(props) {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // PROPS
    const { user, filters, data } = props
    const { authorsFilter, categoriesFilter } = filters
    const { books } = data

    // STATE
    const [layout, setLayout] = useState(layouts.grid)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [qtdFiltered, setQtdFiltered] = useState(filteredBooks.length)

    // Aplicando filtros sobre os livros
    const handleBookFilters = () => {
        let newBookCollection = []
        
        newBookCollection = books.filter(item => {
            // autores
            const isFromAuthor = authorsFilter.includes(item.author)
            // categoriesFilter
            const isFromCategories = categoriesFilter.includes(item.category)

            return (isFromAuthor || isFromCategories)
        }) 

        if (newBookCollection.length === 0) {
            setFilteredBooks(books)
            return
        }
        setFilteredBooks(newBookCollection)
    }

    // componentDidUpdate
    useEffect(() => {
        handleBookFilters()
    }, [filters])

    useEffect(() => {
        if (qtdFiltered === 0 && books.length > 0) {
            setFilteredBooks(books)
            setQtdFiltered(books.length)
        }
    }, [books])

    const actions = [
        {
            label: 'Busca Avançada',
            onClick: () => alert('BUSCA AVANÇADA'),
            className: 'page-actions',
            icon: 'search',
        },
        { 
            label: 'Limpar filtros',
            title: 'Limpar filtros',
            onClick: props.cleanFilters, 
            className: 'page-actions',
            icon: 'eraser'
        },
        {
            label: 'Filtros',
            onClick: () => BookFilters.showModal(),
            icon: 'filter',
            className: 'page-actions d-md-none',
            // variant: 'primary'
        },
        {
            label: '',
            title: 'Lista',
            onClick: () => setLayout(layouts.list),
            icon: 'list',
            className: 'page-actions d-none d-md-block',
            active: (layout === layouts.list)
        },
        {
            label: '',
            title: 'Grade',
            onClick: () => setLayout(layouts.grid),
            icon: 'th',
            className: 'page-actions d-none d-md-block',
            active: (layout === layouts.grid),
        },
    ]

    const title = "Livros"
    const subtitle = qtdFiltered > 0 ? `Total ${qtdFiltered} livros.` : '...'
    const isFiltered = (authorsFilter.length > 0 || categoriesFilter.length > 0)

    return (
        <PageWrapper title={title}>
            
            <ContentWrapper title={title} subtitle={subtitle} actions={actions} >

                <Container id="livros-container" fluid>

                    { isFiltered && 
                        <FilteredBadges items={[...authorsFilter, ...categoriesFilter]} />
                    }

                    <div className="main-row row">
                        <Col className="livros-col-filter" md={3} xl={2}>
                            <BookFilters />
                        </Col>

                        <Col className="livros-col-content">
                            { (qtdFiltered === 0) 
                                ? <LoadingLocal message="Carregando livros..." /> 
                                : (
                                    <div className="row-inner row">
                                        {(qtdFiltered > 0)
                                            ? ( filteredBooks
                                                .sort((a,b) => {
                                                    if (a.title < b.title) return -1;
                                                    if (a.title > b.title) return 1;
                                                    return 0
                                                })
                                                .map(bk => (
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
                                )
                            }
                        </Col>
                    </div>

                </Container>
                
            </ContentWrapper>

        </PageWrapper>
    )
}

/** Renderiza pequenos badges descrevendo itens filtrados */
function FilteredBadges({ items }) {
    return (
        <div style={{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            padding:'0.5rem 0'
        }}>
            <span style={{ fontSize:10 }}>Filtros aplicados: </span>

            { items.map((item,key) => 
                <Badge
                    key={key}
                    variant="primary"
                    style={{fontSize:10, margin:'0px 2px'}}
                >
                    { item }
                </Badge>
            ) }
        </div>
    )
}

// REDUX
const mapStateToProps = ({ filters, data }) => ({
    filters,
    data
})

const mapDispatchToProps = {
    cleanFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(Livros)

