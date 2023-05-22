import { useState, useEffect } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'
import MyInput from "../../UI/input/MyInput"
import RequestList from "../../API/RequestList"
import { useFetching } from "../../hooks/useFetching"
import Alert from "../../UI/alert"

const NewInfo = ({user, setUser,...props}) => {
    const [info, setInfo] = useState({firstName: '', lastName: ''})

    const [fetchEdit, isEditLoading, editError, setEditError] = useFetching(async () => {
        await RequestList.putById(user.id, 'users/info', info);
        return setUser({...user, ...info})
    })

    const change = () => {
        if(info.firstName && info.lastName){
            fetchEdit()
            props.setVisible(false)
            setInfo({firstName: '', lastName: ''})
        }
    }

    useEffect(() => {
        setEditError(false)
        setInfo({firstName: '', lastName: ''})
    }, [props.visible])

    return(
        <div className={classes.account_password} onClick={e => e.stopPropagation()}>
            {editError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <label>Новое имя</label>
            <MyInput value={info.firstName} change={e => setInfo({...info, firstName: e})} />
            <label>Новое отчество</label>
            <MyInput value={info.lastName} change={e => setInfo({...info, lastName: e})} />
            <MyButton disabled={!info.firstName || !info.lastName} onClick={change}>Поменять</MyButton>
        </div>
    )
}

export default NewInfo