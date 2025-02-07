import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
import {ICards, ICardsStatus} from "../types/cards.types.ts";
import axios from "axios";

const initialState: ICardsStatus = {
    list: [],
    loading: false,
    error: null,
};
function isError(action: AnyAction){
    return action.type.endsWith('rejected');
}

export const fetchTodos = createAsyncThunk<ICards[], undefined, {rejectValue : string}>(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        if (Object.keys(response.data).length === 0) {
            return rejectWithValue('Server Error');
        }
        return response.data
    }
)
export const deleteTodos = createAsyncThunk<ICards[], undefined, {rejectValue : string}>(
    'todos/deleteTodos',
    async function (id, {rejectWithValue}) {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (response.status != 'ok') {
            return rejectWithValue('Server Error');
        }
        return id
    }
)

const toDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state: ICardsStatus) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state: ICardsStatus, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchTodos.rejected, (state: ICardsStatus, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            })
            .addCase(deleteTodos.fulfilled, (state: ICardsStatus, action ) => {
                state.list = state.list.filter(todo => todo.id !== action.payload);
            })
            .addMatcher(isError, (state: ICardsStatus, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });

    }

});

// Export actions and reducer
export const { addTodo, removeTodo } = toDoSlice.actions;
export default toDoSlice.reducer;