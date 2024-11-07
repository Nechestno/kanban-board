import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICards} from "../types/cards.types.ts";

const initialState: { todos: ICards[] } = {
    todos: [],
};
const toDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ICards>) => {
            console.log(state);
            console.log(action);
            state.todos.push(action.payload);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
});

// Export actions and reducer
export const { addTodo, removeTodo } = toDoSlice.actions;
export default toDoSlice.reducer;