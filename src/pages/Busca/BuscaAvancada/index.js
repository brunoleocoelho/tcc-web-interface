import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Accordion } from 'react-bootstrap'
import BookFormBuilder from '../../../components/BookFormBuilder'
import EmptyContent from '../../../components/EmptyContent'
import LoadingLocal from '../../../components/LoadingLocal'
import PageWrapper from '../../../components/PageWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import CustomThemeContext from '../../../services/CustomThemeContext'
import ItensResultadoBusca from './ItensResultadoBusca'
import { buildUriEcoded, parseQueryString } from '../../../utils/utilFunctions'
import './BuscaAvancada.css'

function BuscaAvançadaForm(props) {
    // PROPS
    const { location, data } = props
    const { books, authors, categories, publishers } = data

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // STATE
    const [params, setParams] = useState({})
    const [foundBooks, setFoundBooks] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(true)

    // FUNCTIONS
    /** Atualização para cada campo preecnhido */
    const onChangeInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        const newParams = {
            ...params ? params : {},
            [name]: value
        }
        setParams(newParams)
    }

    // Monta na URL a busca efetuada
    const writeUrlQry = () => {
        const strQry = buildUriEcoded(params)
        const path = [ location.pathname, strQry ].join('')
        props.history.push(path)
    }

    // Pega os valores da query string da URL
    const getQryFromUrl = () => {
        const qry = location.search
        const urlParams = parseQueryString(qry)

        if (urlParams.length) {
            const newParams = {}
            urlParams.forEach(item => {
                newParams[item.key] = item.value
            })
            setParams(newParams)
        }
    }

    // limpa os parametros
    const cleanParams = () => setParams({})
    
    /** Atualiza os parametros e livros encontrados na busca */
    const handleFoundBooks = (e) => {
        if (e) e.preventDefault()
        setIsSearching(true)
        writeUrlQry()

        let arrIdFound = []
        Object.keys(params).forEach(item => {
            const paramItem = params[item]
            if (paramItem === "") return 
            console.log('=== params', {item, paramItem})

            books.forEach(bk => {
                const bkItem = bk[item]
                const isSimilar = bkItem.toLowerCase().includes(paramItem.toLowerCase())

                if (!isSimilar) return
                
                const hasInArray = arrIdFound.includes(bk.id)
                if (!hasInArray) {
                    arrIdFound.push(bk.id)
                }
            })
        })
        
        const resultArr = (arrIdFound.length)
            ? books.filter(item => arrIdFound.includes(item.id))
            : arrIdFound       
        
        const efetivaBusca = () => {
            setFoundBooks(resultArr)
            setParams(params)
            setIsSearching(false)
        }

        // simulando tempo de busca
        setTimeout(efetivaBusca, 500)
    }

    // Atualiza state com a informação que "isReady" e efetua busca se precisar
    const updateReady = () => {
        if ((authors.length > 0) && (categories.length > 0) && (publishers.length > 0)) {
            setIsReady(true)
            if (Object.keys(params).length) handleFoundBooks()
        }
    }
    
    // EFFECTS
    useEffect(getQryFromUrl, [])
    useEffect(updateReady, [authors, categories, publishers])
    // useEffect(handleFoundBooks, [location, books])

    const themeApply = theme.third
    const searchForm = [
        {
            edit: true,
            fields: [{
                groups: [{
                    id: 'title',
                    name: 'title',
                    label: 'Título',
                    type: 'text',
                    style: themeApply,
                    value: params.title, 
                    size: 'sm',
                    placeholder: 'Digite um título de livro',
                    sm: '6',
                    onChange: onChangeInput
                },{
                    id: 'subtitle',
                    name: 'subtitle',
                    label: 'Subtítulo',                    
                    type: 'text',
                    style: themeApply,
                    value: params.subtitle, 
                    size: 'sm',
                    placeholder: 'Digite um subtítulo de livro',
                    sm: '6',
                    onChange: onChangeInput
                }]
            },{
                groups: [{
                    id: 'author',
                    name: 'author',
                    label: 'Autor',
                    type: 'text',
                    style: themeApply,
                    size: 'sm',
                    placeholder: 'Digite um autor',
                    sm: '6',
                    onChange: onChangeInput,
                    as: 'select',
                    value: params.author, 
                    defaultValue: '',
                    children: [
                        <option value=''>...</option>,
                        ...(authors && authors.map((autor, idx) => {
                            return <option value={autor} key={`author-${idx}`}>{autor}</option>
                        }))
                    ]
                },{
                    id: 'category',
                    name: 'category',
                    label: 'Categoria',
                    type: 'text',
                    style: themeApply,
                    size: 'sm',
                    placeholder: 'Digite uma categoria de livro',
                    sm: '6',
                    onChange: onChangeInput,
                    as: 'select',
                    value: params.category, 
                    defaultValue: '',
                    children: [
                        <option value=''>...</option>,
                        ...(categories && categories.sort().map((categ, idx) => {
                            return <option value={categ} key={`categeory-${idx}`}>{categ}</option>
                        }))
                    ]
                }]
            },{
                groups: [{
                    id: 'publisher',
                    name: 'publisher',
                    label: 'Editora',
                    type: 'text',
                    style: themeApply,
                    size: 'sm',
                    placeholder: 'Digite uma editora de livro',
                    onChange: onChangeInput,
                    as: 'select',
                    value: params.publisher, 
                    defaultValue: '',
                    children: [
                        <option value=''>...</option>,
                        ...(publishers && publishers.map((editora, idx) => {
                            return <option value={editora} key={`publisher-${idx}`}>{editora}</option>
                        }))
                    ]
                },{
                    id: 'isbn',
                    name: 'isbn',
                    label: 'ISBN',
                    type: 'text',
                    sm: '6',
                    style: themeApply,
                    value: params.isbn, 
                    size: 'sm',
                    placeholder: 'Digite um ISBN para busca',
                    onChange: onChangeInput
                }]
            },{
                groups: [{
                    id: 'publication_year',
                    name: 'publication_year',
                    label: 'Ano Publicação',
                    type: 'text',
                    sm: '4',
                    style: themeApply,
                    value: params.publication_year, 
                    size: 'sm',
                    placeholder: 'Digite o ano de publicação',
                    onChange: onChangeInput
                },{
                    id: 'publication_place',
                    name: 'publication_place',
                    label: 'Local Publicação',
                    type: 'text',
                    sm: '4',
                    style: themeApply,
                    value: params.publication_place, 
                    size: 'sm',
                    placeholder: 'Digite um local de publicação para busca',
                    onChange: onChangeInput
                },{
                    id: 'edition',
                    name: 'edition',
                    label: 'Edição',
                    type: 'text',
                    sm: '4',
                    style: themeApply,
                    value: params.edition, 
                    size: 'sm',
                    placeholder: 'Digite a edição para busca',
                    onChange: onChangeInput
                }]
            }]
        }
    ]

    const actions = [{
        type: 'submit',
        variant: theme.themeName,
        className: 'col-6',
        onClick: handleFoundBooks,
        children: (<>
            <i className="fa fa-fw fa-search"></i> 
            <span>Buscar</span>
        </>),
    }]
    
    const plural = (foundBooks.length !== 1) ? 'livros encontrados' : 'livro encontrado'
    const titleContent = `Busca de Livros${isReady ? `: ${foundBooks.length} ${plural}`:''}`
    const idForm = 'form-busca-avancada'
    const btnHideText = `${isFormOpen ? 'Ocultar':'Ver'} formulário de busca`

    return (
        <PageWrapper title="Busca">
            <ContentWrapper title={titleContent}>
                <Container>
                    { !isReady && 
                        <LoadingLocal />
                    }

                    { isReady && (<>
                        <Accordion defaultActiveKey={idForm}>
                            <Accordion.Toggle
                                as={Button}
                                eventKey={idForm} 
                                className="accord-toggle"
                                variant={theme.themeName}
                                actionClick={() => {
                                    setIsFormOpen(!isFormOpen)
                                }}
                            >
                                { btnHideText }
                            </Accordion.Toggle>
                    
                            <Accordion.Collapse eventKey={isFormOpen ? idForm : '0'}>
                                <div className="accord-collapse-content">
                                    <BookFormBuilder form={searchForm} />
                                    <div className="text-center">
                                        { actions.map((action, idx) => {
                                            return <Button {...action} key={`btn-act-${idx}`} />
                                        }) }
                                    </div>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>

                        <div className="result-container">
                            { isSearching && 
                                <LoadingLocal/>
                            }
                            { (!isSearching && !foundBooks.length)
                                ? <EmptyContent message="Nenhum livro" />
                                : <ItensResultadoBusca items={foundBooks} />
                            }
                        </div>
                    </>) }
                </Container>
            </ContentWrapper>
        </PageWrapper>
    )
}


const mapStateToProps = ({ data }) => ({
    data
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BuscaAvançadaForm)
