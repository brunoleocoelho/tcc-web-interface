import {
    BOOKS_SET_ALL,
    BOOKS_SET_LASTREAD,
    BOOKS_SET_DELIVER,
    BOOKS_SET_RESERVED,
    BOOKS_SET_FAVORITE,
} from '../actions/types'

// Valores iniciais do store para livros
const INITIAL = {
    books: [],
    lastRead: [],
    deliver: [],
    reserved: [],
    favorites: []
}

/** Reducer para livros */
function BooksReducer(state = INITIAL, action) {
    switch (action.type) {
        case BOOKS_SET_ALL:
            return {
                ...state,
                books: action.books
            }
    
        default:
            return state
    }
}

export default BooksReducer