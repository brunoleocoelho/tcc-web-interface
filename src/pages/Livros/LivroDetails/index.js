import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CustomThemeContext from '../../../services/CustomThemeContext'
import { getOneBook, getAllBooks } from '../../../services/api/BookServiceApi'
import PageWrapper from '../../../components/PageWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import LoadingLocal from '../../../components/LoadingLocal'
import EmptyContent from '../../../components/EmptyContent'
import BookCard from '../../../components/BookCard'
import BookInfoForm from '../../../components/BookInfoForm'
import ItemSuggestionCustom from '../../../components/AutoSuggestSearch/ItemSuggestionCustom'
import './LivroDetails.css'

function LivroDetails(props) {
    // PROPS
    const { match, data } = props
    const { id } = match.params
    const { books } = data

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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

    // componentDidMount
    useEffect(() => {
        if (!book){
            setIsLoading(true)
            getBookInfo()
        }
    }, [])

    useEffect(() => {
        if (book && id !== book.id){
            setIsLoading(true)
            getBookInfo()
        }
    }, [id])


    
    // Renderiza as informações do livro
    const renderBookInfo = () => {
        const sameAuthor =  books
            .filter(bks => (bks.author === book.author && bks.id !== book.id))
            .map((item,idx) => {
                if (idx <= 3)
                return <ItemSuggestionCustom book={item}/>
            })
    
        const sameCategory =  books
            .filter(bks => (bks.category === book.category && bks.id !== book.id))
            .map((item,idx) => {
                if (idx <= 3)
                return <ItemSuggestionCustom book={item}/>
            })

        return (
            <Row>
                <Col>
                    <Card style={theme.fourth} className="card-info">
                        <Card.Header>
                            <Card.Title>Informações do Livro</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BookInfoForm book={book} />
                        </Card.Body>
                    </Card>
                

                    <Row>
                        <Col xs={12} md={6}>
                            <Card style={theme.fourth} className="card-info section-info">
                                <Card.Header>
                                    <Card.Title>Outros do mesmo Autor</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    { sameAuthor.length > 0 
                                        ? sameAuthor
                                        : <EmptyContent message="Nennhum outro livro"/>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                                
                        <Col xs={12} md={6}>
                            <Card style={theme.fourth} className="card-info section-info">
                                <Card.Header>
                                    <Card.Title>Outros da mesma Categoria</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    { sameCategory.length > 0
                                        ? sameCategory
                                        : <EmptyContent message="Nenhum outro livro"/>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    const title = `Livro (${id}) ${book ? book.title : ''}`
    const loadigMsg = 'Carregando informações...'

    return (
        <PageWrapper title={title}>
            <ContentWrapper title={title} /* subtitle={subtitle} actions={actions} */ >
            
                <Container>
                    { (!book || isLoading)
                        ? <LoadingLocal message={loadigMsg} />
                        :(<>
                            {(Object.keys(book).length === 0)
                                ? <EmptyContent message={`Livro id '${id}' não encontrado.`} />
                                : renderBookInfo()
                            }
                        </>)
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
