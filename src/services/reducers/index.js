import { combineReducers } from "redux";
import BookFilterReducer from "./BookFilterReducer";
import BooksReducer from './BooksReducer'

const reducers = combineReducers({
    bookFilters: BookFilterReducer,
    booksData: BooksReducer,
})

export default reducers;