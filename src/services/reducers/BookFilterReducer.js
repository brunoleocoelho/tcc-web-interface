import { 
    AUTHOR_SET_FILTER,
    CATEGORY_SET_FILTER,
    PUBLISHER_SET_FILTER,
    CLEAN_FILTERS
} from '../actions/types'

// Valores iniciais do store 'filters'
const INITIAL = {
    authorsFilter: [],
    categoriesFilter: [],
    publishersFilter: []
}

/** Reducer para filtros de livros. Store: 'filters' */
function BookFilterReducer(state = INITIAL, action) {
    switch (action.type) {
        case AUTHOR_SET_FILTER:
            return {
                ...state,
                authorsFilter: action.authorsFilter
            }
        
        case CATEGORY_SET_FILTER:
            return {
                ...state,
                categoriesFilter: action.categoriesFilter
            }
        
        case PUBLISHER_SET_FILTER:
            return {
                ...state,
                publishersFilter: action.publishersFilter
            }
        case CLEAN_FILTERS:
            return INITIAL

        default:
            return state
    }

}

export default BookFilterReducer