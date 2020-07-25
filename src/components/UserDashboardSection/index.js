import React from 'react'
import { Row, Badge } from 'react-bootstrap'
import { getAllBooks } from '../../services/StorageService'
import UltmosLivros from './UltmosLivros'
import EntregaLivros from './EntregaLivros'
import SectionSubject from './SectionSubject'
import SectionBook from './SectionBook'

/**
 * Componente que renderiza um pequeno dashboard
 */
function UserDashboardSection() {
    const { books } = getAllBooks()

    const sections = [
        { 
            title:'Últimos Lidos', headerStyle: {backgroundColor: 'darkolivegreen'}, icon:'binoculars',
            items: [...books], note: ['há', 'dias'], variant: 'success'
        },
        { 
            title:'Entregas', headerStyle: {backgroundColor: 'orange'}, icon:'warning',
            items: [...books], note: ['em', 'dias'], variant: 'warning'
        },
        { 
            title:'Reservas', headerStyle: {backgroundColor: 'darkcyan'}, icon:'book',
            items: [...books], note: ['há', 'dias'], variant: 'info'
        },
        { 
            title:'Favoritos', headerStyle: {backgroundColor: 'royalblue'}, icon:'star',
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

                {/* <UltmosLivros />
                <EntregaLivros /> */}
            </Row>
        </>
    )
}

export default UserDashboardSection
