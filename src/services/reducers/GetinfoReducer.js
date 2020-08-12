import { 
    GETINFO_BOOK,
    GETINFO_AUTHOR,
    GETINFO_CLEAN
} from '../actions/types'

const INITIAL = {
    book: null,
    author: null,
}

/** Reducer para os itens consultados */
function GetinfoReducer(state = INITIAL, action) {
    switch (action.type) {
        case GETINFO_BOOK:
            return { 
                ...state, 
                book: action.book
            }

        case GETINFO_AUTHOR:
            return { 
                ...state, 
                author: action.author
            }

        case GETINFO_CLEAN:
            return INITIAL

        default:
            return state
    }
}

export default GetinfoReducer