import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from '../css/editTask.module.css'
const EditTask = () => {
    let navigate = useNavigate()
    let {id} = useParams()

    let [todo, setTodo] = useState({
        title: "",
        startTime: "",
        endTime: "",
        status: "",
        priority: 0
    })

    let {title, startTime, endTime, status, priority} = todo

    let fetchTodo = () => {
        axios.get(`https://task-management-app-backend-version2.vercel.app/todoApp/getTodo/${id}`, {withCredentials: true})
        .then((response) => {
            console.log(response)
            let todo = response.data.data.todo
            let {title, startTime, endTime, status, priority} = todo
            startTime = startTime.slice(0, 16)
            endTime = endTime.slice(0, 16)
            priority = priority.toString()
            setTodo({title, startTime, endTime, status, priority})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log(todo)
        let {title, startTime, endTime, status, priority} = todo
        startTime = startTime + ":00.000Z"
        endTime = endTime + ":00.000Z"
        console.log(startTime)
        console.log(endTime)
        axios.put('https://task-management-app-backend-version2.vercel.app/todoApp/updateTodo', {id, title, startTime, endTime, status, priority}, {withCredentials: true})
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
        <h1 className={style["edit-task-title"]}>Edit Task</h1>
        <form onSubmit={handleSubmit} className={style["edit-task-form"]}>

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
                <input type="radio" name="priority" id="priority-1" value="1" checked={priority === "1"}/> <label>1</label> {" "}
                <input type="radio" name="priority" id="priority-2" value="2" checked={priority === "2"}/> <label>2</label> {" "}
                <input type="radio" name="priority" id="priority-3" value="3" checked={priority === "3"}/> <label>3</label> {" "}
                <input type="radio" name="priority" id="priority-4" value="4" checked={priority === "4"}/> <label>4</label> {" "}
                <input type="radio" name="priority" id="priority-5" value="5" checked={priority === "5"}/> <label>5</label> {" "}
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

export default EditTask