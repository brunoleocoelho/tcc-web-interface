import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import SectionSubject from './SectionSubject'
import CustomThemeContext from '../../services/CustomThemeContext'
import LoadingLocal from '../LoadingLocal'
import { getRandArrPos } from '../../utils/utilFunctions'
import './UserDashboardSection.css'

/**
 * Componente que renderiza um pequeno dashboard
 */
function UserDashboardSection(props) {
    // PROPS
    const { books } = props

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // STATE
    const [sections, setSections] = useState([])

    // FUNCTIONS
    // deveolve livros aleatorios p/ simular tela dashboard
    const getRandomBooks = () => {
        const arrNum = getRandArrPos(books, 4)
        const arrResult = books.filter((item, idx) => arrNum.includes(idx))
        return arrResult
    }

    // Function que popula as seções
    const fillSections = () => {
        if (!books) return

        const allSections = [
            { 
                title:'Últimos Lidos', icon:'binoculars', iconColor: 'darkolivegreen',
                items: getRandomBooks(), variant: 'success', note: (n) => ['há', 'dias'].join(` ${n} `)
            },
            { 
                title:'Entregas', icon:'warning', iconColor: 'darkorange',
                items: getRandomBooks(), variant: 'warning', note: (n) => ['em', 'dias'].join(` ${n} `)
            },
            { 
                title:'Reservas', icon:'book', iconColor: 'darkcyan',
                items: getRandomBooks(), variant: 'info', note: (n) => ['há', 'dias'].join(` ${n} `)
            },
            { 
                title:'Favoritos', icon:'star', iconColor: 'royalblue',
                items: getRandomBooks(), variant: null, note: (num) => {
                    let stars = []
                    for (let idx = 0; idx <= num; idx++) {
                        stars.push( 
                            <i className="star fa fa-star" key={`star-${idx}`}></i> 
                        )
                    }
                    return <div className="stars-container">
                        { stars.map(item => item) }
                    </div>
                }
            }
        ]
        setSections(allSections)
    }

    const handleBookChanges = () => {
        if (sections.length === 0 && books.length > 0) fillSections()
    }

    // componentDidUpdate
    useEffect(handleBookChanges, [ books ])

    // Function que devolve mensagem de carregamento
    const stillLoading = <LoadingLocal message="Carregando seções..." />
    
    // RENDER
    return (
        <div id="user-dashboard-container" 
            className="dashboard-container"
            style={theme.primary}
        >
            <Row id="user-dashboard-sections" className="p-2 m-0">
                { (books.length === 0)
                    ? stillLoading
                    : (
                        sections.map((sct, idxSct) => {
                            const key = `${idxSct}-${sct.title.replace(' ','')}`
                            return (
                                <SectionSubject 
                                    key={key} 
                                    theme={theme} 
                                    {...sct}
                                />
                            )
                        })
                    )
                }
            </Row>
        </div>
    )
}

const mapStateToProps = ({ data }) => ({
    books: data.books
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardSection)
