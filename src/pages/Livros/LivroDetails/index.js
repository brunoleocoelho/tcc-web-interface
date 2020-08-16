import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CustomThemeContext from '../../../services/CustomThemeContext'
import { getOneBook } from '../../../services/api/BookServiceApi'
import { getUser } from '../../../services/AuthenticationService'
import PageWrapper from '../../../components/PageWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import LoadingLocal from '../../../components/LoadingLocal'
import EmptyContent from '../../../components/EmptyContent'
import BookInfoForm from '../../../components/BookInfoForm'
import ItemSuggestionCustom from '../../../components/AutoSuggestSearch/ItemSuggestionCustom'
import { getRandArrPos } from '../../../utils/utilFunctions'
import './LivroDetails.css'


function LivroDetails(props) {
    // console.log("+++ LivroDetails", props)
    // PROPS
    const { match, data } = props
    const { id } = match.params
    const { books } = data

    const user = getUser()
    const isStudent = (user.role === 'estudante')
    
    const arrLocation = (props.location.pathname).split('/')
    const lastIdx = (arrLocation.length -1)
    const viewEdit = arrLocation[lastIdx]
    const isEdit = (viewEdit === 'edit')

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [toEdit, setToEdit] = useState(isEdit && !isStudent)

    // Function que traz as informações do livro
    const getBookInfo = async () => {
        try {
            const data = await getOneBook(id)
            setBook(data)
        }
        catch (error) {
            console.error('[ERRO] getBookInfo',error)    
        }
        setIsLoading(false)
    }

    // function que habilita editar item
    const handleToEdit = () => {
        // const goAhead = checkChanges()
        // if (!goAhead) return
        // setBook(props.book)
        const ext = (toEdit) ? 'view' : 'edit'
        const arrLocPathCopy = [...arrLocation]
        arrLocPathCopy.pop()
        props.history.push( [...arrLocPathCopy, ext].join('/') )
    
        setToEdit(!toEdit)
    }

    const handleIdChange = () => {
        if (book && id !== book.id){
            setIsLoading(true)
            getBookInfo()
        }
    }

    const handleInit = () => {
        if (!book){
            setIsLoading(true)
            getBookInfo()
        }
        if (isEdit && isStudent) {
            const arrLocPathCopy = [...arrLocation]
            arrLocPathCopy.pop()
            props.history.push( [...arrLocPathCopy, 'view'].join('/') )
        }
    }

    // componentDidMount
    useEffect(handleInit)

    useEffect(handleIdChange, [id])

    // botões de ação do formulário
    const actions = (!isStudent) 
        ? [
            {
                label: 'Editar',
                title: 'Edita este livro',
                onClick: handleToEdit,
                className: 'page-actions',
                icon: 'pencil',
            },
            {
                label: 'Salvar',
                title: 'Salva a edição deste livro',
                onClick: () => {
                    console.log("Salvar livro", book)
                    handleToEdit()
                },
                disabled: (!toEdit),
                className: 'page-actions',
                icon: 'floppy-o',
            } 
        ] 
        : []

    // Renderiza as informações do livro
    const renderBookInfo = () => {
        const sameAuthor = books.filter(bk => (
            bk.author === book.author && bk.id !== book.id
        ))
        const sameCateg  = books.filter(bk => (
            bk.category === book.category && bk.id !== book.id
        ))
        
        const qtdShow = 4
        const randAutor = getRandArrPos(sameAuthor, qtdShow)
        const randCateg = getRandArrPos(sameCateg, qtdShow)

        const booksRelated = [
            {
                xs: '12',
                md: '6',
                card: {
                    title: 'Livros do mesmo autor',
                    emptyMsg: 'Nenhum outro livro deste autor',
                    body: randAutor.map((num,idx) => {
                        const item = sameAuthor[num]
                        return <ItemSuggestionCustom key={'ItemSugg-author-'+idx} book={item}/>
                    })
                }
            },{
                xs: '12',
                md: '6',
                card: {
                    title: 'Livros da mesma categoria',
                    emptyMsg: 'Nenhum outro livro desta categoria',
                    body: randCateg.map((num,idx) => {
                        const item = sameCateg[num]
                        return <ItemSuggestionCustom key={'ItemSugg-category-'+idx} book={item}/>
                    })
                }
            }
        ]
        
        return (
            <Row>
                <Col>
                    <Card style={theme.fourth} className="card-info">
                        <Card.Header>
                            <Card.Title>Dados do Livro</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BookInfoForm book={book} edit={toEdit} />
                        </Card.Body>
                    </Card>

                    <Row className="related-books">
                        { booksRelated.map((item, idx) => {
                            const { card, ...otherCol } = item

                            return (
                                <Col {...otherCol} key={`card-suggest-${idx}`}>
                                    <Card style={theme.fourth} className="card-info section-info">
                                        <Card.Header>
                                            <Card.Title>
                                                { card.title }
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            { (card.body.length > 0)
                                                ? card.body
                                                : <EmptyContent message={ card.emptyMsg }/>
                                            }
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }) }
                    </Row>
                </Col>
            </Row>
        )
    }

    const subtitle = `${book ? book.title : ''} (${id})`
    const title = `Livro ${subtitle}`
    const loadigMsg = 'Carregando informações...'

    return (
        <PageWrapper title={title}>
            <ContentWrapper title={"Informações de Livro"} actions={actions} subtitle={subtitle} >
            
                <Container>
                    { (!book || isLoading)
                        ? <LoadingLocal message={loadigMsg} />
                        :(Object.keys(book).length === 0)
                            ? <EmptyContent message={`Livro id '${id}' não encontrado.`} />
                            : renderBookInfo()
                    }
                </Container>
                
            </ContentWrapper>
        </PageWrapper>
    )
}

const mapStateToProps = ({ data }) => ({
    data
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(LivroDetails)
