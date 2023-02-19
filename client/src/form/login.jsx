import { useEffect, useState } from 'react'
import './forms.css'

const Login = ({...props}) => {
    const [values, setValues] = useState({firstValue: '', secondValue: ''})

    useEffect(() => setValues({firstValue: '', secondValue: ''}), [props.visible])

    return(
        <div className="change-box" onClick={(e => e.stopPropagation())}>
            <div className="password-box">
                <input value={values.firstValue} onInput={e => setValues({...values, firstValue: e.target.value})} type="email" required/>
                <label>Почта</label>
            </div>
            <div className="password-box">
                <input value={values.secondValue} onInput={e => setValues({...values, secondValue: e.target.value})} type="password" required/>
                <label>Пароль</label>
            </div>
            <center>
                <a href="#">
                    Войти
                    <span></span>
                </a>
            </center>
        </div>
    )
}

export default Login