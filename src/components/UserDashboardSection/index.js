import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { getAllBooks } from '../../services/StorageService'
import SectionSubject from './SectionSubject'
import UserSummaryHeader from '../UserSummaryHeader'

// import { themes } from '../../services/Constants'
import CustomThemeContext from '../../services/CustomThemeContext'

/**
 * Componente que renderiza um pequeno dashboard
 */
function UserDashboardSection() {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    const { books } = getAllBooks()
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
        <div id="user-dashboard-container" className="" style={theme.first} >
            
            <div id="user-dashboard-summary" className="d-none d-md-block" >
                <UserSummaryHeader key="user-summary-1" />
            </div>

            <div 
                id="user-dashboard-title"
                className="p-2 mb-2 text-center text-md-left" 
                style={theme.second}
            >
                <h5>Resumo de suas atividades</h5>
            </div>

            <Row id="user-dashboard-sections" className="p-2 m-0">
                { sections.map((sct, idxSct) => {
                    return (
                        <SectionSubject 
                            key={`${idxSct}-${sct.title.replace(' ','')}`} 
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
