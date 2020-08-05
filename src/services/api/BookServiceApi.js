import data from '../../assets/data/books.json'
import { REQUEST_TIME_MS } from '../../utils/constants'

/**
 * Retorna os livros da API **MOCK SIMULADO** 
 */
export async function getAllBooks() {
    const getBooksApi = () => {
        return data.books
    }

    const prom = new Promise(resolve => setTimeout(resolve, REQUEST_TIME_MS))
    return prom.then(getBooksApi)
}

/**
 * Retorna os autores dos livros da API **MOCK SIMULADO** 
 */
export async function getAllAuthors() {
    const getAuthorsApi = () => {
        const authors = data.books.reduce((acum, val) => {
            if (!acum.includes(val.author)) acum.push(val.author)
            return acum
        }, [])
        return authors;
    }

    const prom = new Promise(resolve => setTimeout(resolve, REQUEST_TIME_MS))
    return prom.then(getAuthorsApi)
}

/**
 * Retorna as categorias dos livros da API **MOCK SIMULADO** 
 */
export async function getAllCategories() {
    const getCategoriesApi = () => {
        const authors = data.books.reduce((acum, val) => {
            if (!acum.includes(val.category)) acum.push(val.category)
            return acum
        }, [])
        return authors;
    }

    const prom = new Promise(resolve => setTimeout(resolve, REQUEST_TIME_MS))
    return prom.then(getCategoriesApi)
}