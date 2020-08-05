import { AUTHOR_SET_FILTER, CATEGORY_SET_FILTER, CLEAN_FILTERS } from './types'

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

/**
 * Recebe as categorias para filtrar
 * @param {*} categories 
 */
export function setCategoryrFilter(categories) {
    return {
        type: CATEGORY_SET_FILTER,
        categories
    }
}

/**
 * Recebe as categorias para filtrar
 */
export function cleanFilters() {
    return {
        type: CLEAN_FILTERS,
        payload: null
    }
}