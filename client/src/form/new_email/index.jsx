import { useState, useEffect } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'
import Alert from "../../UI/alert"
import { useFetching } from "../../hooks/useFetching"
import RequestList from "../../API/RequestList"
import MyInput from "../../UI/input/MyInput"


const NewEmail = ({user, setUser, ...props}) => {
    const [email, setEmail] = useState({one: '', two: ''})

    const [fetchEdit, isEditLoading, editError, setEditError] = useFetching(async () => {
        await RequestList.putById(user.id, 'users/email', {email: email.one});
        return setUser({...user, email: email.one})
    })

    const change = () => {
        if(email.one && email.two && email.one == email.two){
            fetchEdit()
            props.setVisible(false)
            setEmail({one: '', two: ''})
        }
    }

    useEffect(() => {
        setEditError(false)
        setEmail({one: '', two: ''})
    }, [props.visible])

    return(
        <div className={classes.account_password} onClick={e => e.stopPropagation()}>
            {editError && <Alert style={{fontSize: 15}}>Почтовый адресс уже привязан к другому аккаунту</Alert>}
            <label>Новый почтовый адресс</label>
            <MyInput style={{width: '100%'}} value={email.one} change={selected => setEmail({...email, one: selected})} />
            <label>Повторить почтовый адресс</label>
            <MyInput style={{width: '100%'}} value={email.two} change={selected => setEmail({...email, two: selected})} />
            <MyButton disabled={!email.one || !email.two} onClick={change}>Поменять</MyButton>
        </div>
    )
}

export default NewEmail