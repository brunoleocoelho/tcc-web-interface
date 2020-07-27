import React from 'react'

import './UserDashboardSection.css'

/**
 * Componente que renderiza um item (livro) de 
 * um section do dashboard de estudante
 */
function SectionBook(props) {
    // PROPS
    const { disposition: dsp, book, noteMark } = props

    const css = {
        list: {
            container: 'col-12',
            noteMark: 'float-right',
            bookCont: 'text-center',
            bookBody: 'p-1 row',
            bookImg: 'listImg',
            bookTitle: 'col-10 text-wrap'
        },
        grid: {
            container: 'col-3',
            noteMark: 'position-absolute',
            bookCont: 'text-center',
            bookBody: '',
            bookImg: 'listImg gridImg',
            bookTitle: 'small text-center px-1'
        }
    }
    
    return (
        <div className={'section-book p-0 '+ css[dsp].container}>

            { noteMark &&
                <div className={css[dsp].noteMark} >
                    { noteMark }
                </div>
            }

            <div className={css[dsp].bookBody}>

                <div className={css[dsp].bookCont}>
                    <img src={book.image_url} className={css[dsp].bookImg} />
                </div>
                
                <div className={css[dsp].bookTitle}>
                    { book.title }
                </div>

            </div>
        </div>
    )
}

/**
 * **DEPRECATED** Apresenta em formato de item de grade
 * @deprecated mudança de layout feita agora direto no CSS
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
 * **DEPRECATED** Apresenta em formato de item de lista
* @deprecated mudança de layout feita agora direto no CSS
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
