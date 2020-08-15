import {
    BOOKS_SET_ALL,
    AUTHORS_SET_ALL,
    CATEGORIES_SET_ALL,
    PUBLISHERS_SET_ALL,
} from '../actions/types'

// Valores iniciais do store'data'
const INITIAL = {
    books: [],
    authors: [],
    categories: [],
    publishers: []
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

        case PUBLISHERS_SET_ALL:
            return {
                ...state,
                publishers: action.publishers
            }
        default:
            return state
    }
}

export default BooksReducer