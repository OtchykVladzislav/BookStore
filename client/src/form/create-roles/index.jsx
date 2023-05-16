import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'

const CreateRole = ({data, setData, visible, setVisible}) => {
    const [form, setFormValue] = useState({name: '', description: '', weight: ''});

    const [fetchAdd, isAddLoading, addError, setAddError] = useFetching(async () => {
        let obj = await RequestList.addElem('roles', form);
        const list = data
        list.unshift(obj.data)
        return setData([...list])
    })

    const handleSubmit = () => {
        if(form.name && form.description && form.weight){
            fetchAdd()
            setVisible(false)
        }
    }

    useEffect(() => {
        setFormValue({name: '', description: '', weight: ''})
        setAddError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {addError && <Alert style={{fontSize: 15}}>Ошибка данных</Alert>}
            <div>
                <label>Название</label>
                <MyInput className={classes.username_box} value={form.name} change={selected => setFormValue({...form, name: selected})} />
            </div>
            <div>
                <label>Описание</label>
                <MyInput className={classes.password_box} value={form.description} change={selected => setFormValue({...form, description: selected})} />
            </div>
            <div>
                <label>Важность(min: 1, max: 3)</label>
                <InputNumber max={3} min={1} className={classes.password_box} value={form.weight} change={selected => setFormValue({...form, weight: selected})} />
            </div>
            <MyButtonTwo disabled={!form.name || !form.description || !form.weight} onClick={() => handleSubmit()}>
                Добавить
            </MyButtonTwo>
        </div>
    )
}

export default CreateRole