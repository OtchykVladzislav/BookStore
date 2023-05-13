import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import PasswordInput from '../../UI/password_input'
import Alert from '../../UI/alert'
import jwtDecode from 'jwt-decode'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'

const Login = ({visible, setVisible}) => {
    const [form, setFormValue] = useState({username: '', password: ''});
    const dispatch = useDispatch()
    const [token, setToken] = useState('')

    const [fetchLogin, isLoginLoading, loginError, setLoginError] = useFetching(async () => {
        console.log(form)
        const obj = await RequestList.login(form);
        return setToken(obj.data.acsess_token)
    })

    useEffect(() => {
        if(token){
            if(jwtDecode(token).role == "admin") {
                setVisible(false)
                return;
            }
            if(jwtDecode(token).role != "admin"){
                localStorage.setItem('user', token)
                dispatch({type: 'ADD_TOKEN', payload: token})
                setVisible(false)
                return;
            }
        }
    }, [token])

    const handleSubmit = () => {
        if(form.username && form.password) fetchLogin()
    };

    const checkValid = () => {
        return !form.username || !form.password
    }

    useEffect(() => {
        setFormValue({username: '', password: ''})
        setLoginError('')
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {loginError && <Alert style={{fontSize: 15}}>Неверно введенный логин или пароль</Alert>}
            <div>
                <label>Никнейм</label>
                <MyInput className={classes.username_box} value={form.username} change={selected => setFormValue({...form, username: selected})} />
            </div>
            <div>
                <label>Пароль</label>
                <PasswordInput className={classes.password_box} value={form.password} change={selected => setFormValue({...form, password: selected})} />
            </div>
            <MyButtonTwo disabled={checkValid()} onClick={() => handleSubmit()}>
                Вход
            </MyButtonTwo>
        </div>
    )
}

export default Login