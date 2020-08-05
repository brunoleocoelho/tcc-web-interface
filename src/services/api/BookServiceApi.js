import booksData from '../../assets/data/books.json'
import { REQUEST_TIME_MS } from '../../utils/constants'

/**
 * Retorna os livros da API **MOCK SIMULADO** 
 */
export async function getAllBooks() {
    const getBooksApi = () => {
        return booksData.books
    }

    const prom = new Promise(resolve => setTimeout(resolve, REQUEST_TIME_MS))
    return prom.then(getBooksApi)
}