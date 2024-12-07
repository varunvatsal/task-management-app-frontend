import React from 'react'
import style from '../css/footer.module.css'
const Footer = () => {
  return (
    <>
        <footer className={style.footer}>
            <p className={style.text}>
                © {new Date().getFullYear()} Task Management App made by varun vatsal, {" "}
                <a href="https://www.linkedin.com/in/varun-vatsal-19286a201/" target='_blank'>My Linkedin</a> {" "} | {" "}
                <a href="https://github.com/varunvatsal" target='_blank'>My github</a>
            </p>
        </footer>
    </>
  )
}

export default Footer