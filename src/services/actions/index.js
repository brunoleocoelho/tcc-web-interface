import { AUTHOR_SET_FILTER } from './types'

/**
 * Recebe os autores para filtrar
 * @param {*} authors 
 */
export function setAuthorFilter(authors) {
    return {
        type: AUTHOR_SET_FILTER,
        authors
    }
}