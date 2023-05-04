import { useEffect, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import { useDispatch } from 'react-redux'

const Registration = ({...props}) => {
    const [values, setValues] = useState({firstName: '', lastName: '', username: '', phone_number: '', email: '', password: ''})

    const dispatch = useDispatch()

    const [fetchRegistration, isRegistrationLoading, registrationError] = useFetching(async () => {
        const obj = await RequestList.registration(values);
        if(obj.data.acsess_token){
            localStorage.setItem('user', obj.data.acsess_token)
            dispatch({type: 'ADD_TOKEN', payload: obj.data.acsess_token})
            props.setVisible(false)
        }
    })

    const send = () => {
        fetchRegistration()
        console.log(registrationError)
    }

    useEffect(() => {setValues({firstName: '', lastName: '', username: '', phone_number: '', email: '', password: ''})}, [props.visible])

    return(
        <div className={classes.change_box} onClick={(e => e.stopPropagation())}>
            <div className={classes.password_box}>
                <input value={values.firstName} onInput={e => setValues({...values, firstName: e.target.value})} type="text" required/>
                <label>Имя</label>
            </div>
            <div className={classes.password_box}>
                <input value={values.lastName} onInput={e => setValues({...values, lastName: e.target.value})} type="text" required/>
                <label>Фамилия</label>
            </div>
            <div className={classes.password_box}>
                <input value={values.username} onInput={e => setValues({...values, username: e.target.value})} type="text" required/>
                <label>Никнейм</label>
            </div>
            <div className={classes.password_box}>
                <input value={values.phone_number} onInput={e => setValues({...values, phone_number: e.target.value})} type="tel" required/>
                <label>Телефон</label>
            </div>
            <div className={classes.password_box}>
                <input value={values.email} onInput={e => setValues({...values, email: e.target.value})} type="email" required/>
                <label>Почта</label>
            </div>
            <div className={classes.password_box}>
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