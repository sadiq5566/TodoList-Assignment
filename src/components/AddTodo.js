import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../slices/todo';

const AddTodo = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(createTodo({
            title: value
        }))
        inputRef.current.value = ""

    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <label className='sr-only'>Name</label>
                <input
                    type='text'
                    ref={inputRef}
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Add todo...'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                ></input>

                <button type='submit' className='btn btn-primary mb-2'>
                    Submit
                </button>    </form>
        </>
    )
}

export default AddTodo
