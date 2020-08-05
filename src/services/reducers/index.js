import { combineReducers } from "redux";
import BookFilterReducer from "./BookFilterReducer";
import BooksReducer from './BooksReducer'

const reducers = combineReducers({
    filters: BookFilterReducer,
    data: BooksReducer,
})

export default reducers;