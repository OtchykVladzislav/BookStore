import { useState, useEffect } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'
import Alert from "../../UI/alert"
import PhoneInput from 'react-phone-number-input'
import { useFetching } from "../../hooks/useFetching"
import RequestList from "../../API/RequestList"

const NewPhoneNumber = ({user, setUser, ...props}) => {
    const [phoneNumber, setPhoneNumber] = useState('')

    const [fetchEdit, isEditLoading, editError, setEditError] = useFetching(async () => {
        await RequestList.putById(user.id, 'users/phone_number', {phone_number: phoneNumber});
        return setUser({...user, phone_number: phoneNumber})
    })

    const change = () => {
        if(phoneNumber){
            fetchEdit()
            props.setVisible(false)
            setPhoneNumber('')
        }
    }

    useEffect(() => {
        setEditError(false)
        setPhoneNumber('')
    }, [props.visible])

    return(
        <div className={classes.account_password} onClick={e => e.stopPropagation()}>
            {editError && <Alert style={{fontSize: 15}}>Телефон уже привязан к другому аккаунту</Alert>}
            <label>Новый номер телефона</label>
            <PhoneInput style={{width: '100%'}} value={phoneNumber} onChange={setPhoneNumber} />
            <MyButton disabled={!phoneNumber} onClick={change}>Поменять</MyButton>
        </div>
    )
}

export default NewPhoneNumber