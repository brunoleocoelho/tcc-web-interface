import { 
    AUTHOR_SET_FILTER,
    CATEGORY_SET_FILTER,
    CLEAN_FILTERS
} from '../actions/types'

// Valores iniciais do store
const INITIAL = {
    authors: [],
    categories: []
}

/** Functions para filtros de livros */
function BookFilterReducer(state = INITIAL, action) {
    switch (action.type) {
        case AUTHOR_SET_FILTER:
            return {
                ...state,
                authors: action.authors
            }
        
        case CATEGORY_SET_FILTER:
            return {
                ...state,
                categories: action.categories
            }
        
        case CLEAN_FILTERS:
            console.log({state, action})
            return {
                ...INITIAL
            }

        default:
            // console.log({state, action})
            return state
    }

}

export default BookFilterReducer