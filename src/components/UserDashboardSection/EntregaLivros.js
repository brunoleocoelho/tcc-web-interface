import React from 'react'
import { Badge } from 'react-bootstrap'
import { getAllBooks } from '../../services/StorageService'
import SectionSubject from './SectionSubject'

function EntregaLivros() {
    const { books } = getAllBooks()

    console.log("EntregaLivros", books)
    return (
        <SectionSubject
            title="Livros para entregar"
            headerStyle={{ backgroundColor: 'orange' }}
        >
            {(books.length > 0) && 
                books.map((bk, idx)=> {
                    if (idx >= 4) return null
                    return (
                        <div className='p-0 col-12' key={bk.id}>
                            <Badge className="float-right" variant="warning">em {idx} dias</Badge>
                            <div className="p-1 row">
                                <img src={bk.image_url} width={30} style={{ overflow:'hidden' }} />
                                <span className="col-10 text-wrap">{bk.title}</span>
                            </div>
                        </div>
                    )
                })
            }
        </SectionSubject>
    )
}

export default EntregaLivros
