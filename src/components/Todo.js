import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { delTodo, updTodo, deleteTodo, updateTodo } from '../slices/todo'

const Todo = ({ id, title, childForm }) => {

    const dispatch = useDispatch();
    const [isEditform, setIsEditform] = useState(false)
    const inputRef = useRef(null);

    const renderForm = () => {

        const updateTodoHanlde = () => {

            dispatch(updateTodo({
                title: inputRef.current.value, id: id
            }))
            setIsEditform(false)
            inputRef.current.value = null
        }
        return (
            <>
                <input type="text" ref={inputRef} defaultValue={title} />
                <button onClick={updateTodoHanlde}>Update</button>
            </>
        )
    }

    const renderItem = () => {

        const editHandle = () => {
            setIsEditform(true)
        }
        const deleteHandle = () => {
            dispatch(deleteTodo({
                id: id,
            }))
        }

        return (

            <>
                <tr key={id} >

                    <td onClick={() => { childForm({ id }) }}>{title}</td>
                    <td><button onClick={editHandle}>Edit</button></td>
                    <td><button onClick={deleteHandle}>Delete</button></td>
                </tr>
            </>
        )
    }
    console.log("here edit form", isEditform)

    return (
        <>
            {
                isEditform ? renderForm() : renderItem()
            }

        </>

    )
}

export default Todo
