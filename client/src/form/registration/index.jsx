import { useEffect, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import { useDispatch } from 'react-redux'
import PasswordInput from '../../UI/password_input'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'
import Alert from '../../UI/alert'
import jwtDecode from 'jwt-decode'

const Registration = ({visible, setVisible}) => {
    const [values, setValues] = useState({firstName: '', lastName: '', username: '', phone_number: '', email: '', password: ''})
    const dispatch = useDispatch()
    const [token, setToken] = useState('')

    const [fetchRegistration, isRegistrationLoading, registrationError, setRegistrationError] = useFetching(async () => {
        const obj = await RequestList.registration(values);
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
        if(values.firstName && values.lastName && values.email && values.phone_number && values.username && values.password) fetchRegistration()
    };

    const checkValid = () => {
        return !values.firstName || !values.lastName || !values.email || !values.phone_number || !values.username || !values.password
    }

    useEffect(() => {
        setValues({firstName: '', lastName: '', username: '', phone_number: '', email: '', password: ''})
        setRegistrationError('')
    }, [visible])

    return(
        <div className={classes.change_box} onClick={(e => e.stopPropagation())}>
            {registrationError && <Alert style={{fontSize: 15}}>Такой пользователь уже существует</Alert>}
            <div>
                <label>Имя</label>
                <MyInput value={values.firstName} change={e => setValues({...values, firstName: e})} type="text"/>
            </div>
            <div>
                <label>Фамилия</label>
                <MyInput value={values.lastName} change={e => setValues({...values, lastName: e})} type="text"/>
            </div>
            <div>
                <label>Никнейм</label>
                <MyInput value={values.username} change={e => setValues({...values, username: e})} type="text"/>
            </div>
            <div>
                <label>Телефон</label>
                <MyInput value={values.phone_number} change={e => setValues({...values, phone_number: e})} type="tel"/>
            </div>
            <div>
                <label>Почта</label>
                <MyInput value={values.email} change={e => setValues({...values, email: e})} type="email" />
            </div>
            <div>
                <label>Пароль</label>
                <PasswordInput value={values.password} change={e => setValues({...values, password: e})} />
            </div>
            <MyButtonTwo disabled={checkValid()} onClick={() => handleSubmit()}>
                Зарегистрироваться
            </MyButtonTwo>
        </div>
    )
}

export default Registration