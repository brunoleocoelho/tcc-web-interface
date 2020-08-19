import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import SectionSubject from './SectionSubject'
import CustomThemeContext from '../../services/CustomThemeContext'
import LoadingLocal from '../LoadingLocal'
import { getRandArrPos } from '../../utils/utilFunctions'

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
                items: getRandomBooks(), note: ['há', 'dias'], variant: 'success'
            },
            { 
                title:'Entregas', icon:'warning', iconColor: 'darkorange',
                items: getRandomBooks(), note: ['em', 'dias'], variant: 'warning'
            },
            { 
                title:'Reservas', icon:'book', iconColor: 'darkcyan',
                items: getRandomBooks(), note: ['há', 'dias'], variant: 'info'
            },
            { 
                title:'Favoritos', icon:'star', iconColor: 'royalblue',
                items: getRandomBooks(), note: ['*****'], variant: null
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
