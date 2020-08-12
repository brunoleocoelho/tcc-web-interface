import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CustomThemeContext from '../../../services/CustomThemeContext'
import { getOneBook, getAllBooks } from '../../../services/api/BookServiceApi'
import PageWrapper from '../../../components/PageWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import LoadingLocal from '../../../components/LoadingLocal'
import EmptyContent from '../../../components/EmptyContent'

function LivroDetails(props) {
    // console.log("-- LivroDetails", props)
    // PROPS
    const { match } = props
    const { id } = match.params

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [book, setBook] = useState(null)

    // Function que traz as informações do livro
    const getBookInfo = async () => {
        try {
            const data = await getOneBook(id)
            setBook(data)
        }
        catch (error) {
            console.error('[ERRO] getBookInfo',error)    
        }
    }

    // componentDidMount
    useEffect(() => {
        if (!book) getBookInfo()
    }, [])

    useEffect(() => {
        if (book && id !== book.id) getBookInfo()
    }, [id])

    // Renderiza as informações do livro
    const renderBookInfo = () => {
        return (
            <div>
                <p>{ book.title }</p>
                <p>{ book.author }</p>
                <p>{ book.publisher }</p>
                <p>{ book.category }</p>
            </div>
        )
    }

    const title = `Livro: ${id}`
    const loadigMsg = 'Carregando informações...'

    return (
        <PageWrapper title={title}>
            <ContentWrapper title={title} /* subtitle={subtitle} actions={actions} */ >
            
                <Container>
                    { (!book)
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

export default LivroDetails
