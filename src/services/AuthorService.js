import { getAllBooks, getFilterApplied, storeFiltersApplied } from "./StorageService"

/** 
 * Retorna os autores a partir da lista de livros disponível 
 */
function getAllAuthors() {
    const authors = getAllBooks().books.reduce((acum, val) => {
        if (!acum.includes(val.author)) acum.push(val.author)
        return acum
    }, [])

    return authors
}

/** 
 * Função que armazena todos os autores selecionados do filtro no localstorage 
 * @param {array} authors array de autores selecionados
 */
function storeSelectedAuthors(authors) {
    if (!authors) return

    // Concatena autores aos filtros
    const filters = getFilterApplied()
    const newFilters = {...filters, authors}
    
    storeFiltersApplied(newFilters)
}

/**
 * Função que retorna os autores selecionados
 * @return {array} de autores selecionados para filtro
 */
function getSelectedAuthors() {
    // Recuperando autores dos filtros
    const filters = getFilterApplied()

    if (!filters) return []
    if (!filters.authors) return []

    return filters.authors
}

// Exports
export {
    getAllAuthors,
    storeSelectedAuthors,
    getSelectedAuthors,
}