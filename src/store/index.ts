import {configureStore} from "@reduxjs/toolkit";
import toDoReducer from './toDoSlice.ts'

const store =  configureStore({
    reducer: {
        todos: toDoReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;