import React from 'react'
import './SectionBook.css'

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

    const id = [
        book.id,
        book.isbn,
        book.title.replace(" ","").toLowerCase()
    ].join('-')
    
    return (
        <div id={id} className={'section-book p-0 '+ css[dsp].container}>

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

export default SectionBook
