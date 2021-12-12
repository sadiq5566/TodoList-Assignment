import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { retrieveChildTodos } from '../slices/childTodo';

import ChildTodo from './ChildTodo';

const ChildTodoList = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveChildTodos());

    }, [dispatch])
    const childtodos = useSelector(state => state.childTodos)
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Completed</th>
                        <th scope="col">Name</th>
                        <th scope="col">cDate</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        childtodos && childtodos.length > 0 ? childtodos.filter((todo) => todo.pId.id == props.pid.id).map((todo) =>
                            <ChildTodo key={todo.id} title={todo.title} id={todo.id} cDate={todo.cDate} completed={todo.completed} />

                        ) : null
                    }


                </tbody>
            </table>
        </div>
    )
}

export default ChildTodoList
