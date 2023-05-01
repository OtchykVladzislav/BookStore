import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './forms.css'
import RequestList from '../API/RequestList'
import { useFetching } from '../hooks/useFetching'

const Login = ({...props}) => {
    const [values, setValues] = useState({username: '', password: ''})
    const dispatch = useDispatch()

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async () => {
        const obj = await RequestList.login(values);
        if(obj.data.acsess_token){
            localStorage.setItem('user', obj.data.acsess_token)
            dispatch({type: 'ADD_TOKEN', payload: obj.data.acsess_token})
            props.setVisible(false)
        }
    })

    const send = () => {
        fetchLogin()
        console.log(loginError)
    }

    useEffect(() => setValues({username: '', password: ''}), [props.visible])

    return(
        <div className="change-box" onClick={(e => e.stopPropagation())}>
            <div className="password-box">
                <input value={values.username} onInput={e => setValues({...values, username: e.target.value})} type="text" required/>
                <label>Никнейм</label>
            </div>
            <div className="password-box">
                <input value={values.password} onInput={e => setValues({...values, password: e.target.value})} type="password" required/>
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