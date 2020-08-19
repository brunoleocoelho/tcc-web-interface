import React from 'react'
import { Link } from 'react-router-dom'
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
            bookBody: 'book-body p-1 row',
            bookImg: 'listImg',
            bookTitle: 'col-10 text-wrap'
        },
        grid: {
            container: 'col-3',
            noteMark: 'position-absolute',
            bookCont: 'text-center',
            bookBody: 'book-body',
            bookImg: 'listImg gridImg',
            bookTitle: 'small text-center px-1'
        }
    }

    const id = [
        book.id,
        book.isbn,
        book.title.replace(" ","").toLowerCase()
    ].join('-')

    const pathUrlBook = `/livros/info/${book.id}/view`
    
    return (
        <div id={id} className={'section-book p-0 '+ css[dsp].container}>
            <Link to={pathUrlBook} className="section-book-link">

                { noteMark &&
                    <div className={css[dsp].noteMark} >
                        { noteMark }
                    </div>
                }

                <div className={css[dsp].bookBody}>

                    <div className={css[dsp].bookCont}>
                        <img src={book.image_url} className={css[dsp].bookImg} alt="" />
                    </div>
                    
                    <div className={css[dsp].bookTitle}>
                        { book.title }
                    </div>

                </div>
        </Link>
            </div>
    )
}

export default SectionBook
