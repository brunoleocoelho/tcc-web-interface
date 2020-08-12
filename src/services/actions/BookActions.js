import {
    BOOKS_SET_ALL,
    AUTHORS_SET_ALL,
    CATEGORIES_SET_ALL,
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

/**
 * Armazena no redux os autores dos livros
 * @param {*} authors todos os autores dos livros
 */
export function setAllAuthors(authors) {
    return {
        type: AUTHORS_SET_ALL,
        authors
    }
}

/**
 * Armazena no redux as categorias dos livros
 * @param {*} categories todas as categorias dos livros
 */
export function setAllCategories(categories) {
    return {
        type: CATEGORIES_SET_ALL,
        categories
    }
}
