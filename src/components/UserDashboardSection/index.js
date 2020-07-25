import React from 'react'
import { Row } from 'react-bootstrap'
import { getAllBooks } from '../../services/StorageService'
import SectionSubject from './SectionSubject'

/**
 * Componente que renderiza um pequeno dashboard
 */
function UserDashboardSection() {
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
        <>
            <div className="p-2 text-center text-md-left">
                <h5>Resumo de suas atividades</h5>
            </div>

            <Row className="m-0">
                { sections.map((sct, idxSct) => {
                    return (
                        <SectionSubject 
                            key={`${idxSct}-${sct.title.replace(' ','')}`} 
                            {...sct}
                        />
                    )
                }) }
            </Row>
        </>
    )
}

export default UserDashboardSection
