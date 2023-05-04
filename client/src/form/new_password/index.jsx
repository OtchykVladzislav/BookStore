import { useState, useEffect } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'

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
            <input value={password.one} onInput={e => setPassword({...password, one: e.target.value})} type="password" />
            <label>Повторить пароль</label>
            <input value={password.two} onInput={e => setPassword({...password, two: e.target.value})} type="password" />
            <MyButton onClick={change}>Поменять</MyButton>
        </div>
    )
}

export default NewPassword