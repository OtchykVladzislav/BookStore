import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'
import { SelectPicker } from 'rsuite'

const ChangeRole = ({obj, data, setData, visible, setVisible}) => {
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState(0);

    const [fetchRole, isRoleLoading, roleError] = useFetching(async () => {
        const obj = await RequestList.getAll('roles');
        setRoles([...obj.data])
    })

    const [fetchEdit, isEditLoading, editError, setEditError] = useFetching(async () => {
        const item = roles.find(e => e.id == role)
        await RequestList.putById(obj.id, 'users', item);
        const list = data
        list[obj.index].role = item
        return setData([...list])
    })

    const handleSubmit = () => {
        if(role){
            fetchEdit()
            setVisible(false)
        }
    }

    const nameRole = (num) => {
        switch (num) {
            case 1:
                return 'Обычный доступ'
            case 2:
                return 'Средний доступ'
            case 3:
                return 'Высокий доступ'
        }
    }

    useEffect(() => {
        if(visible) fetchRole()
        setRole(0)
        setEditError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {editError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <div>
                <SelectPicker style={{marginBottom: 10}} menuStyle={{zIndex: 700}} data={roles.map(item => ({label: `${item.name}(${nameRole(item.weight)})`, value: item.id }))} className={classes.username_box} value={role} onChange={selected => setRole(selected)} placeholder="Выберите роль...."/>
            </div>
            <MyButtonTwo disabled={!role} onClick={() => handleSubmit()}>
                Изменить роль
            </MyButtonTwo>
        </div>
    )
}

export default ChangeRole