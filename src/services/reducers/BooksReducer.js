import {
    BOOKS_SET_ALL,
    AUTHORS_SET_ALL,
    CATEGORIES_SET_ALL,
    BOOKS_SET_LASTREAD,
    BOOKS_SET_DELIVER,
    BOOKS_SET_RESERVED,
    BOOKS_SET_FAVORITE,
} from '../actions/types'

// Valores iniciais do store'data'
const INITIAL = {
    books: [],
    authors: [],
    categories: [],
    lastRead: [],
    deliver: [],
    reserved: [],
    favorites: []
}

/** Reducer para livros. Store: 'data' */
function BooksReducer(state = INITIAL, action) {
    switch (action.type) {
        case BOOKS_SET_ALL:
            return {
                ...state,
                books: action.books
            }

        case AUTHORS_SET_ALL:
            return {
                ...state,
                authors: action.authors
            }

        case CATEGORIES_SET_ALL:
            return {
                ...state,
                categories: action.categories
            }

        default:
            return state
    }
}

export default BooksReducer