import { combineReducers } from "redux"
import BookFilterReducer from "./BookFilterReducer"
import BooksReducer from './BooksReducer'
import GetinfoReducer from "./GetinfoReducer"
import UserReducer from "./UserReducer"

const reducers = combineReducers({
    filters: BookFilterReducer,
    data: BooksReducer,
    getinfo: GetinfoReducer,
    userInfo: UserReducer
})

export default reducers;