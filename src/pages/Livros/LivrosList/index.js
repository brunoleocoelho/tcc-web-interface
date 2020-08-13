import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Badge, Form, DropdownButton } from 'react-bootstrap';

import CustomThemeContext from '../../../services/CustomThemeContext';
import { cleanFilters } from '../../../services/actions/BookFilterActions'
import { getAllBooks } from '../../../services/api/BookServiceApi'
import { setAllBooks } from '../../../services/actions/BookActions';
import BookCard from '../../../components/BookCard';
import BookFilters from '../../../components/BookFilters';
import ContentWrapper from '../../../components/ContentWrapper';
import PageWrapper from '../../../components/PageWrapper';
import EmptyContent from '../../../components/EmptyContent';
import LoadingLocal from '../../../components/LoadingLocal';
import BookInfoModal from '../../../components/BookInfoModal';
import { layouts } from '../../../utils/constants'

import '../Livros.css'

/**
 * Representa a página de seleção e filtro de livros
 */
function LivrosList(props) {
    // console.log('-- LivrosList', props)
    
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // PROPS
    const { user, filters, data } = props
    const { authorsFilter, categoriesFilter, publishersFilter } = filters
    const { books } = data

    // STATE
    const [layout, setLayout] = useState(layouts.grid)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [orderBy, setOrderBy] = useState('title')
    const [orderWay, setOrderWay] = useState('asc')
    const [bookInfo, setBookInfo] = useState(null)

    // Aplicando filtros sobre os livros
    const handleBookFilters = () => {
        let newBookCollection = []
        
        newBookCollection = books.filter(item => {
            // autores
            const isFromAuthor = authorsFilter.includes(item.author)
            // categoriesFilter
            const isFromCategories = categoriesFilter.includes(item.category)
            // publishers
            const isFromPublishers = publishersFilter.includes(item.publisher)

            return (isFromAuthor || isFromCategories || isFromPublishers)
        }) 

        if (newBookCollection.length === 0) {
            setFilteredBooks(books)
            return
        }
        setFilteredBooks(newBookCollection)
    }

    /** Ordenação os livros */
    const handleSortBooks = (a,b) => {
        const dir = (orderWay==='asc' ? 1 : -1)
        if (a[orderBy] < b[orderBy]) return -1 * dir;
        if (a[orderBy] > b[orderBy]) return 1 * dir;
        return 0
    }

    /** Adiciona um livro para consulta */
    const getInfo = (book) => {
        setBookInfo(book)
    }

    // componentDidUpdate
    useEffect(() => {
        handleBookFilters()
    }, [filters])

    useEffect(() => {
        if (filteredBooks.length === 0 && books.length > 0) {
            setFilteredBooks(books)
        }
    }, [books])

    // lista de ordenação
    const sortList = [
        { label: 'Título', value: 'title' },
        { label: 'Autor', value: 'author' },
        { label: 'Categoria', value: 'category' },
        { label: 'Editora', value: 'publisher' },
    ]

    const sortOptions = (
        <div className="sort-list p-3" style={theme.fourth}>
            { sortList.sort().map(item => {
                const idItem = `sort-${item.value}`
                const isChecked = (item.value === orderBy)

                return (
                    <Form.Check 
                        key={'key-'+idItem}
                        id={idItem}
                        type="checkbox"
                        label={item.label}
                        value={item.value}
                        custom
                        onChange={()=> setOrderBy(item.value)}
                        checked={isChecked}
                        style={theme.fourth}
                    />
                )
            }) }
        </div>
    )

    const actions = [
        {
            label: orderBy,
            title: (<>
                <i className="fa fa-fw fa-sort"></i>
                { sortList.find(item => item.value === orderBy).label }
            </>),
            className: 'page-actions',
            variant: theme.themeName,
            as: DropdownButton,
            children: sortOptions
        },
        {
            label: 'Ordem',
            title: 'Ordenar',
            onClick: () => setOrderWay((orderWay==='asc' ? 'desc' : 'asc')),
            className: 'page-actions',
            icon: (orderWay==='asc' ? 'sort-alpha-asc' : 'sort-alpha-desc'),
        },
        { 
            label: 'Limpar filtros',
            title: 'Limpar filtros',
            onClick: props.cleanFilters, 
            className: 'page-actions d-none d-md-block',
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
    const qtdFiltered = (filteredBooks.length)
    const subtitle = qtdFiltered > 0 ? `Total ${qtdFiltered} livros.` : '...'
    const isFiltered = (authorsFilter.length > 0 || categoriesFilter.length > 0 || publishersFilter.length > 0)

    return (
        <PageWrapper title={title}>
            
            <ContentWrapper title={title} subtitle={subtitle} actions={actions} >

                <Container id="livros-container" fluid>

                    { isFiltered && 
                        <FilteredBadges items={[...authorsFilter, ...categoriesFilter, ...publishersFilter]} />
                    }

                    <BookInfoModal book={bookInfo} />

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
                                                .sort(handleSortBooks)
                                                .map(bk => (
                                                <BookCard 
                                                    key={bk.id} 
                                                    book={bk} 
                                                    theme={theme} 
                                                    layout={layout}
                                                    onClick={() => getInfo(bk)}
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
    cleanFilters,
    setAllBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(LivrosList)

