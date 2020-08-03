import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { getAllBooks } from '../../services/StorageService'
import SectionSubject from './SectionSubject'
import CustomThemeContext from '../../services/CustomThemeContext'

/**
 * Componente que renderiza um pequeno dashboard
 */
function UserDashboardSection() {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    const { books } = getAllBooks()
    if (!books) return null

    const sections = [
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

    return (
        <div id="user-dashboard-container" 
            className="dashboard-container"
            style={theme.primary}
        >
            <Row id="user-dashboard-sections" className="p-2 m-0">
                { sections.map((sct, idxSct) => {
                    const key = `${idxSct}-${sct.title.replace(' ','')}`
                    return (
                        <SectionSubject 
                            key={key} 
                            theme={theme} 
                            {...sct}
                        />
                    )
                }) }
            </Row>
        </div>
    )
}

export default UserDashboardSection
