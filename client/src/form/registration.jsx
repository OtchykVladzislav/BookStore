import { useEffect, useState } from 'react'
import './forms.css'

const Registration = ({...props}) => {
    const [values, setValues] = useState({firstName: '', secondName: '', username: '', phone: '', email: '', password: ''})

    const send = () => {
        console.log('reg')
    }

    useEffect(() => {setValues({firstName: '', secondName: '', username: '', phone: '', email: '', password: ''})}, [props.visible])

    return(
        <div className="change-box" onClick={(e => e.stopPropagation())}>
            <div className="password-box">
                <input value={values.firstName} onInput={e => setValues({...values, firstName: e.target.value})} type="text" required/>
                <label>Имя</label>
            </div>
            <div className="password-box">
                <input value={values.secondName} onInput={e => setValues({...values, secondName: e.target.value})} type="text" required/>
                <label>Фамилия</label>
            </div>
            <div className="password-box">
                <input value={values.username} onInput={e => setValues({...values, username: e.target.value})} type="text" required/>
                <label>Никнейм</label>
            </div>
            <div className="password-box">
                <input value={values.phone} onInput={e => setValues({...values, phone: e.target.value})} type="tel" required/>
                <label>Телефон</label>
            </div>
            <div className="password-box">
                <input value={values.email} onInput={e => setValues({...values, email: e.target.value})} type="email" required/>
                <label>Почта</label>
            </div>
            <div className="password-box">
                <input value={values.password} onInput={e => setValues({...values, password: e.target.value})} type="password" required/>
                <label>Пароль</label>
            </div>
            <center>
                <a href="#" onClick={send}>
                    Регистрация
                    <span></span>
                </a>
            </center>
        </div>
    )
}

export default Registration