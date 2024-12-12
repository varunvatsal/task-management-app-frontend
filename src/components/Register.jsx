import React, { useState } from 'react'
import style from '../css/register.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {

    let navigate = useNavigate()
    
    let [data, setData] = useState({
        email: "",
        password: ""
    })

    let {email, password} = data

    let handleSubmit = (e) => {
        e.preventDefault()
        let requestBody = {email, password}
        let url = 'https://task-management-app-backend-version2.vercel.app/todoApp/register'
        axios.post(url, requestBody)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        navigate('/login')
    }

    let handleChange = (e) => {
        setData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

  return (
    <>
        <form className={style.formContainer} onSubmit={handleSubmit}> 
            <h1>Register</h1>
            <div className={style.formGroup}>
                <label htmlFor="email" className={style.label}>USER EMAIL</label>
                <input type="email" name="email" id="email" className={style.input} value={email} onChange={handleChange} required/>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="password" className={style.label}>USER PASSWORD</label>
                <input type="password" name="password" id="password" className={style.input} value={password} onChange={handleChange} required/>
            </div>
            <div className={style.formGroup} >
                <button type="submit" className={style.button}>SUBMIT</button>
            </div>
            <div className={style.formGroup}>
                <button className={style.button} onClick={() => {navigate('/login')}}>Go to Login</button>
            </div>
        </form>
    </>
  )
}

export default Register