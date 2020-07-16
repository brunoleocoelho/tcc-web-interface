import { getAllBooks, getFilterApplied, storeFiltersApplied } from "./StorageService"


/** 
 * Retorna as categorias a partir da lista de livros disponível 
 */
function getAllCategories() {
    const categories = getAllBooks().books.reduce((acum, val) => {
        if (!acum.includes(val.category)) acum.push(val.category)
        return acum
    }, [])

    return categories
}

/** 
 * Função que armazena todos as categorias selecionados do filtro no localstorage 
 * @param {array} categ array de categorias selecionados
 */
function storeSelectedCategories(categ) {
    if (!categ) return

    // Concatena autores aos filtros
    const filters = getFilterApplied()
    const newFilters = {...filters, categ}
    
    storeFiltersApplied(newFilters)
}

/**
 * Função que retorna as categorias selecionados
 * @return {array} de autores selecionados para filtro
 */
function getSelectedCategories() {
    // Recuperando autores dos filtros
    const filters = getFilterApplied()

    if (!filters) return []
    if (!filters.categories) return []

    return filters.categories
}

// Exports
export {
    getAllCategories,
    storeSelectedCategories,
    getSelectedCategories,
}