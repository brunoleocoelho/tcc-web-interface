import { combineReducers } from "redux"
import BookFilterReducer from "./BookFilterReducer"
import BooksReducer from './BooksReducer'
import GetinfoReducer from "./GetinfoReducer"

const reducers = combineReducers({
    filters: BookFilterReducer,
    data: BooksReducer,
    getinfo: GetinfoReducer
})

export default reducers;