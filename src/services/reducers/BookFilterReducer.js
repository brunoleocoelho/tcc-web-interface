import { AUTHOR_SET_FILTER } from '../actions/types'

const INITIAL = {
    authors: [],
    categories: []
}

/** Functions para filtros de livros */
function BookFilterReducer(state = INITIAL, action) {
    switch (action.type) {
        case AUTHOR_SET_FILTER:
            console.log({state, action})
            return {...state, authors: action.authors}
            break;
    
        default:
            console.log({state, action})
            return state
            break;
    }

}

export default BookFilterReducer