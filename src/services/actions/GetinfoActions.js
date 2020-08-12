import {
    GETINFO_BOOK,
    GETINFO_AUTHOR,
    GETINFO_CLEAN
} from './types'

/** Action para consulta de livro */
export function setGetinfoBook(book) {
    return {
        type: GETINFO_BOOK,
        book
    }
}

/** Action para consulta de autor */
export function setGetinfoAuthor(author) {
    return {
        type: GETINFO_AUTHOR,
        author
    }
}

/** Action para limpar todas as consultas */
export function cleanGetinfo() {
    return {
        type: GETINFO_CLEAN,
        payload: null
    }
}