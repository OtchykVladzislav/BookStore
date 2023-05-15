import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'

const CreateCity = ({data, setData, visible, setVisible}) => {
    const [form, setFormValue] = useState({name: '', adress: ''});

    const [fetchAdd, isAddLoading, addError, setAddError] = useFetching(async () => {
        let obj = await RequestList.addElem('city', form);
        const list = data
        list.unshift(obj.data)
        return setData([...list])
    })

    const handleSubmit = () => {
        if(form.name && form.adress){
            fetchAdd()
            setVisible(false)
        }
    }

    useEffect(() => {
        setFormValue({name: '', adress: ''})
        setAddError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {addError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <div>
                <label>Город</label>
                <MyInput className={classes.username_box} value={form.name} change={selected => setFormValue({...form, name: selected})} />
            </div>
            <div>
                <label>Адресс</label>
                <MyInput className={classes.password_box} value={form.adress} change={selected => setFormValue({...form, adress: selected})} />
            </div>
            <MyButtonTwo disabled={!form.name || !form.adress} onClick={() => handleSubmit()}>
                Добавить
            </MyButtonTwo>
        </div>
    )
}

export default CreateCity