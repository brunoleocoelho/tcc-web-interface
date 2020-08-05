import {
    BOOKS_SET_ALL,
    BOOKS_SET_LASTREAD,
    BOOKS_SET_DELIVER,
    BOOKS_SET_RESERVED,
    BOOKS_SET_FAVORITE,
} from '../actions/types'

/**
 * Armazena no redux os livros a serem usados na aplicação
 * @param {*} books livros a serem armazenados no store redux
 */
export function setAllBooks(books) {
    return {
        type: BOOKS_SET_ALL,
        books
    }
}