import React, { useState, useRef } from 'react'
import AddTodo from "./AddTodo";
import ChildTodoList from './ChildTodoList';
import TodoList from "./TodoList";
import { useDispatch } from 'react-redux';
import { createChildTodo } from '../slices/childTodo';



const MainTodo = () => {
    const [childForm, setChildForm] = useState(false)
    const [childTitle, setChildTitle] = useState("")
    const [childDate, setChildDate] = useState("")
    const [parentId, setParentId] = useState("")
    const [childTable, setChildTable] = useState(true)
    const dispatch = useDispatch();
    const titleRef = useRef(null)

    const dateRef = useRef(null)


    const handleChildFormToggle = (a) => {
        setChildForm(true)
        setParentId(a)
        setChildTitle("")
        setChildDate("")
        
    }

    const onSubmit = (e) => {
        console.log(childTitle)

        console.log(childDate)
        console.log(parentId)

        e.preventDefault();
        dispatch(createChildTodo({
            title: childTitle,
            cDate: childDate,
            pId: parentId,
        }))
        titleRef.current.value = ""

        dateRef.current.value = ""

        setChildTable(true)
    }
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="w-100"><h1 className="text-center">Todo App</h1></div>
            </div>
            <div className="row">

                <div className="col-md-5">
                    <AddTodo />
                    <TodoList childForm={handleChildFormToggle} />
                </div>
                <div className="col-md-6  ">
                    {
                        childForm ?
                            <div>

                                <form onSubmit={onSubmit}>
                                    <input
                                        type='text'
                                        className='form-control mb-2 mr-sm-2'
                                        placeholder='Add child todo...'
                                        ref={titleRef}

                                        value={childTitle}
                                        onChange={(event) => setChildTitle(event.target.value)}
                                    />
                                    <input
                                        type='date'
                                        className='form-control mb-2 mr-sm-2'
                                        ref={dateRef}

                                        placeholder='select date...'
                                        value={childDate}
                                        onChange={(event) => setChildDate(event.target.value)}
                                    />
                                    <button type="submit">Add Sub Todo</button>
                                </form>
                                {
                                    childTable ? <ChildTodoList pid={parentId} /> : ""
                                }
                            </div>
                            : ""
                    }

                </div>

            </div>
        </div>


    )
}

export default MainTodo

