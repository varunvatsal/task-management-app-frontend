import React, { useState } from 'react'
import style from '../css/addTask.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddTask = () => {

    let navigate = useNavigate()
    
    let [todo , setTodo] = useState({
        title: "",
        startTime: "",
        endTime: "",
        status: "",
        priority: ""
    })

    let {title, startTime, endTime, status, priority} = todo

    let handleSubmit = (e) => {
        e.preventDefault()
        let {title, startTime, endTime, status, priority} = todo
        startTime = startTime + ":00.000Z"
        endTime = endTime + ":00.000Z"
        axios.post('http://localhost:3000/todoApp/insertTodo', {title, startTime, endTime, status, priority}, {withCredentials: true})
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        navigate('/tasklist')
    }

    let handleChange = (e) => {
        setTodo((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

  return (
    <>
        <h1 className={style["add-task-title"]}>Add New Task</h1>
        <form onSubmit={handleSubmit} className={style["add-task-form"]}>
            <div className={style["form-group"]}>
                <label htmlFor="title" className={style["form-label"]}>Enter Title</label>
                <input type="text" id="title" name="title" value={title} onChange={handleChange} className={style["form'input"]} required/>
            </div>
            <div className={style["form-group"]}>
                <label htmlFor="startTime" className={style["form-label"]}>Start Time</label>
                <input type="datetime-local" name="startTime" id="startTime" value={startTime} onChange={handleChange} className={style["form-input"]}/>
                <label htmlFor="endTime" className={style["form-label"]}>End Time</label>
                <input type="datetime-local" name="endTime" id="endTime" value={endTime} onChange={handleChange} className={style["form-input"]}/>
            </div>
            <div value={priority} onChange={handleChange} className={style["form-group radio-group"]} required>
                <label htmlFor="priority" className={style["form-label"]}>Priority</label>
                <input type="radio" name="priority"  value='1'/> <label>1</label> {" "}
                <input type="radio" name="priority"  value='2'/> <label>2</label> {" "}
                <input type="radio" name="priority"  value='3'/> <label>3</label> {" "}
                <input type="radio" name="priority"  value='4'/> <label>4</label> {" "}
                <input type="radio" name="priority"  value='5'/> <label>5</label> {" "}
                
            </div>
            <div className={style["form-group"]}>
                <label htmlFor="status" className={style["form-label"]}>Status</label>
                <select name="status" id="status" value={status} onChange={handleChange} className={style["form-select"]} required>
                    <option value=""></option>
                    <option value="pending">pending</option>
                    <option value="finished">finished</option>
                </select>
            </div>
            <div className={style["form-group"]}>
                <button type="submit" className={style["submit-button"]}>SUBMIT</button>
            </div>
        </form>
    </>
  )
}

export default AddTask