import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import SectionSubject from './SectionSubject'
import CustomThemeContext from '../../services/CustomThemeContext'

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
    // Function que popula as seções
    const fillSections = () => {
        if (!books) return

        const allSections = [
            { 
                title:'Últimos Lidos', icon:'binoculars', iconColor: 'darkolivegreen',
                items: [...books], note: ['há', 'dias'], variant: 'success'
            },
            { 
                title:'Entregas', icon:'warning', iconColor: 'darkorange',
                items: [...books], note: ['em', 'dias'], variant: 'warning'
            },
            { 
                title:'Reservas', icon:'book', iconColor: 'darkcyan',
                items: [...books], note: ['há', 'dias'], variant: 'info'
            },
            { 
                title:'Favoritos', icon:'star', iconColor: 'royalblue',
                items: [...books], note: ['*****'], variant: null
            }
        ]
        setSections(allSections)
    }

    // Function que devolve mensagem de carregamento
    const renderStillLoading = () => (
        <p className="text-center">CARREGANDO SEÇÕES...</p>
    )

    // componentDidUpdate
    useEffect(() => {
        if (sections.length === 0) fillSections(books)
    }, [ books ])

    // componentDidUpdate
    useEffect(() => {
        if (books.length > 0) {
            fillSections()
        }
    }, [ books ])

    // RENDER
    return (
        <div id="user-dashboard-container" 
            className="dashboard-container"
            style={theme.primary}
        >
            <Row id="user-dashboard-sections" className="p-2 m-0">
                { (books.length === 0)
                    ? renderStillLoading()
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

const mapStateToProps = ({ booksData }) => ({
    books: booksData.books
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardSection)
