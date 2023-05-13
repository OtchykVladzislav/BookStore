import { useState, useEffect } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'
import PasswordInput from "../../UI/password_input"

const NewPassword = ({...props}) => {
    const [password, setPassword] = useState({one: '', two: ''})

    const change = () => {
        props.callback(password)
        props.setVisible(false)
    }

    useEffect(() => setPassword({one: '', two: ''}), [props.visible])

    return(
        <div className={classes.account_password} onClick={e => e.stopPropagation()}>
            <label>Новый пароль</label>
            <PasswordInput value={password.one} onChange={e => setPassword({...password, one: e})} />
            <label>Повторить пароль</label>
            <PasswordInput value={password.two} onChange={e => setPassword({...password, two: e})} />
            <MyButton onClick={change}>Поменять</MyButton>
        </div>
    )
}

export default NewPassword