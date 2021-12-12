import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodoDataService from "../services/todo.services";

const initialState = [];

export const createTodo = createAsyncThunk(
  "todos/create",
  async ({ title }) => {
    const res = await TodoDataService.create({ title });
    return res.data;
  }
);

export const retrieveTodos = createAsyncThunk(
  "todos/retrieve",
  async () => {
    const res = await TodoDataService.getAll();
    return res.data;
  }
);
export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, title }) => {
    const res = await TodoDataService.update(id, { title });
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async ({ id }) => {
    await TodoDataService.delete(id);
    return { id };
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [

  ],
  editForm: false,
  reducers: {
    addTodo: (state, action) => {

      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
      }
      state.push(newTodo)
    },
    delTodo: (state, action) => {

      return state.filter((todo) =>
        todo.id !== action.payload.id
      )
    },

    updTodo: (state, action) => {
      const index = state.findIndex((todo) =>
        todo.id == action.payload.id
      )
      state[index] = { id: action.payload.id, title: action.payload.title }
    },
  },
  extraReducers: {
    [createTodo.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTodos.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTodo.fulfilled]: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },

  },
});


export const { addTodo, delTodo, editTodo, updTodo } = todoSlice.actions
const { reducer } = todoSlice;
export default reducer;
