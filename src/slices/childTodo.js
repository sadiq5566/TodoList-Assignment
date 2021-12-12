import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChildTodoDataService from "../services/childtodo.services";

export const createChildTodo = createAsyncThunk(
    "childtodos/create",
    async ({ title, cDate, pId }) => {
        const res = await ChildTodoDataService.create({ title, cDate, pId });
        return res.data;
    }
);

export const retrieveChildTodos = createAsyncThunk(
    "childtodos/retrieve",
    async () => {
        const res = await ChildTodoDataService.getAll();
        return res.data;
    }
);
export const updChildTodo = createAsyncThunk(
    "childtodos/update",
    async ({ id, title }) => {
        console.log("title", title)
        const res = await ChildTodoDataService.update(id, { title });
        return res.data;
    }
);

export const delChildTodo = createAsyncThunk(
    "childtodos/delete",
    async ({ id }) => {
        await ChildTodoDataService.delete(id);
        return { id };
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    "childtodos/toggleComplete",
    async ({ id, completed }) => {
        console.log("before api", completed)
        console.log("before api", { completed })
        const res = await ChildTodoDataService.toggleComplete(id, { completed });
        return res.data;
    }
);

const childTodoSlice = createSlice({
    name: "childTodos",
    initialState: [

    ],
    reducers: {
        addChildTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                cDate: action.payload.cDate,
                pId: action.payload.pId,
            }
            state.push(newTodo)
        },

        deleteChildTodo: (state, action) => {

            return state.filter((todo) =>
                todo.id !== action.payload.id
            )
        },

        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) =>
                todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed

        },

        updateChildTodo: (state, action) => {
            const index = state.findIndex((todo) =>
                todo.id == action.payload.id
            )
            console.log(state[index])
            state[index] = { ...state[index], id: action.payload.id, title: action.payload.title }
        },
    },
    extraReducers: {
        [createChildTodo.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveChildTodos.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updChildTodo.fulfilled]: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [delChildTodo.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },

        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index] = {
                ...state[index],
                completed: action.payload.completed,
                ...action.payload,
            };
        },
    },
});
export const { addChildTodo, deleteChildTodo, updateChildTodo, toggleComplete } = childTodoSlice.actions
const { reducer } = childTodoSlice;
export default reducer;

