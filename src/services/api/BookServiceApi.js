import { mockApiRequest } from "./mockApi"

/**
 * Retorna os livros da API **MOCK SIMULADO** 
 */
export async function getAllBooks() {
    return mockApiRequest(fetch('/mock/books.json'))
        .then( data => data.books)
}

/**
 * Retorna informações de um livro conforme seu 'id' da API **MOCK SIMULADO** 
 */
export async function getOneBook(id) {
    return mockApiRequest(fetch('/mock/books.json'))
        .then(data => {
            const info = (data) && data.books.find(book => book.id === id)
            return info || {}
        })
}

/**
 * Retorna os autores dos livros da API **MOCK SIMULADO** 
 */
export async function getAllAuthors() {
    return mockApiRequest(fetch('/mock/books.json'))
        .then( data => {
            const authors = data.books.reduce((acum, val) => {
                if (!acum.includes(val.author)) acum.push(val.author)
                return acum
            }, [])
            return authors;
        })
}

/**
 * Retorna as categorias dos livros da API **MOCK SIMULADO** 
 */
export async function getAllCategories() {
    return mockApiRequest(fetch('/mock/books.json'))
        .then( data => {
            const categs = data.books.reduce((acum, val) => {
                if (!acum.includes(val.category)) acum.push(val.category)
                return acum
            }, [])
            return categs;
        })
}