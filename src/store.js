import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slices/todo';
import childTodosReducer from './slices/childTodo';
const reducer = {
    todos: todoReducer,
    childTodos : childTodosReducer ,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;