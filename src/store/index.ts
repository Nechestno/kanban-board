import {configureStore} from "@reduxjs/toolkit";
import toDoReducer from './toDoSlice.ts'

export default configureStore({
    reducer: {
        todos: toDoReducer,
    }
})