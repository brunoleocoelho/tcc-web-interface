import { combineReducers } from "redux";
import BookFilterReducer from "./BookFilterReducer";

const reducers = combineReducers({
    bookFilters: BookFilterReducer
})

export default reducers;