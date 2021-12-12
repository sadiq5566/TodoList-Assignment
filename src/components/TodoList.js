import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Todo from './Todo';
import { retrieveTodos } from '../slices/todo';
const TodoList = (props) => {
  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(retrieveTodos());

  }, [dispatch])
  return (
    <div>
      <table className="table">
        <thead>
          <tr>

            <th scope="col">Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

          {

            todos && todos.length > 0 ? todos.map((todo) =>

              <Todo key={todo.id} title={todo.title} id={todo.id} childForm={props.childForm} />

            ) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
