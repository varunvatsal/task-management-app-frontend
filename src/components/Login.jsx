import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../css/login.module.css'
import axios from 'axios'
import Cookies from 'js-cookie'
// axios.post(url, { withCredentials: true, credentials: 'include', body: requestBody })


const Login = () => {
    
    let navigate = useNavigate()

    let [data, setData] = useState({
        email: "",
        password: ""
    })

    let {email, password} = data

    let handleSubmit = (e) => {
        e.preventDefault()
        let requestBody = {email, password}
        let url = 'https://task-management-app-backend-version2.vercel.app/todoApp/login'
        axios.post(url, requestBody, {withCredentials: true})
        .then((response) => {
            console.log(response)
            let accessToken = response.data.data.accessToken
            Cookies.set('accessToken', accessToken)
            navigate('/dashboard')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    let handleChange = (e) => {
        setData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

  return (
    <>
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <h1>Login</h1>
            <div className={style.formGroup}>
                <label htmlFor="email" className={style.label}>USER EMAIL</label>
                <input type="email" name="email" id="email" className={style.input} value={email} onChange={handleChange} required/>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="password" className={style.label}>USER PASSWORD</label>
                <input type="password" name="password" id="password" className={style.input} value={password} onChange={handleChange} required/>
            </div>
            <div className={style.formGroup}>
                <button type="submit" className={style.button}>SUBMIT</button>
            </div>
            <div className={style.formGroup}>
                <button onClick={() => {navigate('/')}} className={style.button} >Go to Register</button>
            </div>
        </form>
    </>
  )
}

export default Login