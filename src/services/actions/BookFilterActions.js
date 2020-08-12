import { AUTHOR_SET_FILTER, CATEGORY_SET_FILTER, CLEAN_FILTERS } from './types'

/**
 * Recebe os autores para filtrar
 * @param {*} authorsFilter 
 */
export function setAuthorFilter(authorsFilter) {
    return {
        type: AUTHOR_SET_FILTER,
        authorsFilter
    }
}

/**
 * Recebe as categorias para filtrar
 * @param {*} categoriesFilter 
 */
export function setCategoryFilter(categoriesFilter) {
    return {
        type: CATEGORY_SET_FILTER,
        categoriesFilter
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