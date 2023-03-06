import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './forms.css'

const Login = ({...props}) => {
    const [values, setValues] = useState({firstValue: '', secondValue: ''})
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwibnVtYmVyIjoiKzM3NTQ0NTc1NzA1NyIsImVtYWlsIjoiam9obl9kb2UtMjY1QG1haWwucnUiLCJ1c2VybmFtZSI6IkJpZ0RqbyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTE2MjM5MDIyfQ.eTqN6o5K6xOI-93hGb03jM5KsR-yuolUGe1Z4BarQg4'
    const dispatch = useDispatch()

    const send = () => {
        localStorage.setItem('user', userToken)
        dispatch({type: 'ADD_TOKEN', payload: userToken})
        props.setVisible(false)
    }

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
                <a href="#" onClick={send}>
                    Войти
                    <span></span>
                </a>
            </center>
        </div>
    )
}

export default Login