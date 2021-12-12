import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, delChildTodo, updChildTodo } from '../slices/childTodo';
const ChildTodo = ({ id, title, cDate, completed }) => {
    const dispatch = useDispatch();
    const [isEditform, setIsEditform] = useState(false)
    const inputRef = useRef(null);


    const renderForm = () => {

        const updateTodo = (e) => {
            e.preventDefault();

            dispatch(updChildTodo({
                title: inputRef.current.value, id: id
            }))
            setIsEditform(false)

        }
        return (
            <>

                <input type="text" ref={inputRef} defaultValue={title} />
                <button onClick={
                    updateTodo
                }>Update</button>
            </>
        )
    }

    const renderItem = () => {

        const editHandle = () => {
            setIsEditform(true)
        }
        const deleteHandle = () => {
            dispatch(delChildTodo({
                id: id,
            }))
        }
        const handleCompleteClick = () => {

            dispatch(
                toggleCompleteAsync({
                    id: id,
                    completed: !completed,
                }))
        }
        return (

            <>
                <tr key={id} >
                    <td><input type="checkbox" defaultChecked={completed} onClick={handleCompleteClick} /> </td>
                    <td >{title}</td>
                    <td>{cDate}</td>
                    <td><button onClick={editHandle}>Edit</button></td>
                    <td><button onClick={deleteHandle}>Delete</button></td>
                </tr>

            </>
        )
    }


    return (
        <>
            {
                isEditform ? renderForm() : renderItem()
            }

        </>

    )
}

export default ChildTodo
