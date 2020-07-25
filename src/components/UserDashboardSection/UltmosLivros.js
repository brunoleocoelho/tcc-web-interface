import React from 'react'
import { Badge } from 'react-bootstrap'
import SectionSubject from './SectionSubject'
import { getAllBooks } from '../../services/StorageService'

/**
 * Componente que renderiza os últimos livros lidos pelo usuário
 */
function UltmosLivros(props) {
    const { books } = getAllBooks()

    console.log("UltimosLivros", books)
    return (
        <SectionSubject
            title="Últimas leituras"
            headerStyle={{ backgroundColor: 'darkolivegreen' }}
        >
            {(books.length > 0) && 
                books.map((bk, idx)=> {
                    if (idx >= 4) return null
                    return (
                        <div className='p-0 col-12' key={bk.id}>
                            <Badge className="float-right" variant="success">há {idx} dias</Badge>
                            <div className="p-1 row">
                                <img src={bk.image_url} width={30} style={{ overflow:'hidden' }} />
                                <span className="col-10 text-break">{bk.title}</span>
                            </div>
                        </div>
                    )
                })
            }
        </SectionSubject>
    )
}

export default UltmosLivros
