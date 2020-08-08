import {
    USER_SET_INFO,
    USER_SET_BOOK_INFO
} from '../actions/types'

const INITIAL = {
    user: null,
    userBooks: {
        lastRead: [],
        inUse: [],
        reserved: [],
        favorites: []
    }
}

/** Reducer para informações do usuário */
function UserReducer (state = INITIAL, action) {
    switch (action.type) {
        case USER_SET_INFO:
            return {
                ...state,
                user: action.user
            }

        case USER_SET_BOOK_INFO:
            return {
                ...state,
                userBooks: action.userBooks
            }
    
        default:
            return state
    }
}

export default UserReducer