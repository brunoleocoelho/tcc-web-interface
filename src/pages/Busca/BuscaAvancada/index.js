import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import PageWrapper from '../../../components/PageWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import { parseQueryString } from '../../../utils/utilFunctions'
import LoadingLocal from '../../../components/LoadingLocal'
import EmptyContent from '../../../components/EmptyContent'

/** Página de resultados da busca avançada */
function ResutadoBusca(props) {
    // PROPS
    const { location, data } = props
    const { books } = data
    
    // STATE
    const [params, setParams] = useState(null)
    const [foundBooks, setFoundBooks] = useState([])
    
    const handleFoundBooks = () => {
        const search = location.search
        const allParams = parseQueryString(search)
        let arrFound = []

        allParams.forEach(item => {
            const {key, value} = item
            books.forEach(bk => {
                const isSimilar = bk[key].toLowerCase().includes(value)
                if (!isSimilar) return
                if (!arrFound.includes(bk.id)) {
                    arrFound.push(bk.id)
                }
            })
        })

        setFoundBooks(arrFound)
        setParams(allParams)
    }

    useEffect(handleFoundBooks, [location, books])

    const plural = (foundBooks.length !== 1) ? 'livros encontrados' : 'livro encontrado'
    const titleContent = `Busca de Livros: ${foundBooks.length} ${plural}`

    return (
        <PageWrapper title="Busca">
            <ContentWrapper title={titleContent}>
                <Container>
                    { !params
                        ? <LoadingLocal />
                        : !foundBooks.length 
                            ? <EmptyContent message="Nenhum livro encontrado" />
                            : books
                                .filter(item => foundBooks.includes(item.id))
                                .map(item => {
                                    return <p>
                                        {item.title} - {item.author}
                                    </p>
                                })
                    }
                </Container>
            </ContentWrapper>
        </PageWrapper>
    )
}

const mapStateToProps = ({ data }) => ({
    data
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResutadoBusca)

