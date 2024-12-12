import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import style from '../css/navbar.module.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
const NavBar = () => {
    let navigate = useNavigate()

    let handleSignOut = () => {
        // Cookies.remove('accessToken')
        axios.post('https://task-management-app-backend-version2.vercel.app/todoApp/getAllTodos', {withCredentials: true})
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        navigate('/login')
    }
  return (
    <>
        <nav className={style.navbar}>
            <div className={style["navbar-brand"]}>
               <h3>Task Management App</h3>
            </div>
            <ul className={style["navbar-links"]}>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/tasklist'>Task List</Link></li>
                <li><Link to='/addtask'>Add New Task</Link></li>
                <li><Link to='/'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
            </ul>
        </nav>
        <br />
    </>
  )
}

export default NavBar