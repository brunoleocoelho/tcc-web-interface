import React from 'react'

import './UserDashboardSection.css'

/**
 * Componente que renderiza um item (livro) de 
 * um section do dashboard de estudante
 */
function SectionBook(props) {
    console.log("SectionBook", props)
    // PROPS
    const { disposition } = props

    if (disposition === 'list')
        return <ListStyleSectionBook {...props} />

    return <GridStyleSectionBook {...props} />
}

/**
 * Apresenta em formato de item de grade
 */
function GridStyleSectionBook({ book, noteMark }) {
    return (
        <div className='p-0 col-3'>
            { noteMark &&
                <div className="position-absolute left" >
                    { noteMark }
                </div>
            }

            <div>
                <div style={{textAlign:'center'}}>
                    <img src={book.image_url} className="listImg gridImg" />
                </div>
                <div className="small text-center px-1">
                    { book.title }
                </div>
            </div>
        </div>
    )
}


/**
 * Apresenta em formato de item de lista
 */
function ListStyleSectionBook({ book, noteMark }) {
    return (
        <div className='p-0 col-12'>
            { noteMark &&
                <div className="float-right" >
                    { noteMark }
                </div>
            }

            <div className="p-1 row">
                <img src={book.image_url} width={30} className="listImg" />
                <span className="col-10 text-wrap">
                    { book.title }
                </span>
            </div>
        </div>
    )
}

// ESTILOS
const styles = {
    listImg: {
        overflow:'hidden'
    },
    gridImg: {
        overflow:'hidden',
        maxHeight: '7rem'
    }

}


export default SectionBook
