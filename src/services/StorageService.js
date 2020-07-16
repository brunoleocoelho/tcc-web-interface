
const booksAll = 'books-all'
const filterApplied = 'filter-applied'

/** 
 * Função que armazena todos os livros no localstorage 
 * @param {array} list array de livros
 */
function storeAllBooks(list) {
    if (!list) return
    
    // const allBooks = getAllBooks()
    // if (allBooks.length === list.length) return
    
    localStorage.setItem(booksAll, JSON.stringify(list))
}

/**
 * Função que retorna todos os livros armazenados
 */
function getAllBooks() {
    const allBooks = JSON.parse(localStorage.getItem(booksAll))
    return allBooks ? allBooks : []
}

/**
 * Função que retorna um livro selecionado
 * @param {string | number} id identificação do livro
 */
function getOneBook(id) {
    if (!id) return {}
    
    const books = getAllBooks()
    if (books.length === 0) return {}

    const found = books.find(item => item.id === id)
    return found ? found : {}
}

/**
 * Função que remove um livro da biblioteca
 * @param {string | number} id identificação do livro a remover
 * @returns {boolean} `true` se conseguir, do contrário `false`
 */
function removeOneBook(id) {
    if (!id) return false
    
    const books = getAllBooks()
    if (books.length === 0) return false

    const filtered = books.filter(item => item.id !== id)
    storeAllBooks(filtered)

    return true
}

/**
 * Retorna todos os filtros aplicados a exibição dos livros
 */
function getFilterApplied() {
    const filters = JSON.parse(localStorage.getItem(filterApplied))
    return filters ? filters : {}
}

/**
 * Armazena os novos valores de filtros selecionados
 * @param {*} filter novos valores a serem adicionado
 */
function storeFiltersApplied(filters) {
    if (!filters) return
    localStorage.setItem(filterApplied, JSON.stringify(filters))
}


// Exports
export {
    storeAllBooks,
    getAllBooks,
    getOneBook,
    removeOneBook,

    getFilterApplied,
    storeFiltersApplied
}