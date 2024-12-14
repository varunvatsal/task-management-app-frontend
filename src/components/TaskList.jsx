import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from '../css/taskList.module.css'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {

  let navigate = useNavigate()

  let [todoList, setTodoList] = useState([])

  let fetchData = () => {
    axios.get('https://task-management-app-backend-version2.vercel.app/todoApp/getAllTodos', {withCredentials: true})
    .then((response) => {
      // console.log(response)
      setTodoList(response.data.data.todos)
    })
    .catch((error) => {
      console.log(error)
      navigate('/unauthorizedReq')
    })
  }

  useEffect(() => {
      fetchData()
  }, [])

  let handleDelete = async (id) => {
    console.log("delete called")
    axios.delete(`https://task-management-app-backend-version2.vercel.app/todoApp/deleteTodo/${id}`,{withCredentials: true})
    fetchData()
  }

  return (
    <>
        <div className={style["todo-container"]}>
          <h1>Todo List</h1>
          <table className={style["todo-table"]}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map(todo => (
                <tr key={todo._id}>
                  <td>{todo.title}</td>
                  <td>{new Date(todo.startTime).toUTCString()}</td>
                  <td>{new Date(todo.endTime).toUTCString()}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.status}</td>
                  <td>
                    <button className={style["edit-btn"]} onClick={() => {navigate(`/editTask/${todo._id}`)}}>Edit</button>
                    <button className={style["delete-btn"]} onClick={() => {handleDelete(todo._id)}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default TaskList