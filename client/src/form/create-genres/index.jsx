import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'
import { Uploader } from 'rsuite'

const CreateGenre = ({data, setData, visible, setVisible}) => {
    const [form, setFormValue] = useState({name: '', image: {}});

    const [fetchAdd, isAddLoading, addError, setAddError] = useFetching(async () => {
        let obj = await RequestList.addElem('genres', form);
        const list = data
        list.unshift(obj.data)
        return setData([...list])
    })

    const handleSubmit = () => {
        if(form.name && form.image.name){
            fetchAdd()
            setVisible(false)
        }
    }
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const base64 = await convertBase64(event);
        setFormValue({...form, image: {name: event.name, type: event.type, picByte: base64}})
    };

    useEffect(() => {
        setFormValue({name: '', image: {}})
        setAddError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {addError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <div>
                <label>Название</label>
                <MyInput className={classes.username_box} value={form.name} change={selected => setFormValue({...form, name: selected})} />
            </div>
            <div>
                <Uploader
                    fileListVisible={false}
                    autoUpload={false}
                    listType='picture'
                    onChange={file => {
                        uploadImage(file[file.length - 1].blobFile)
                    }}
                />
                <span>{form.image.name}</span>
            </div>
            <MyButtonTwo disabled={!form.name || form.image == {}} onClick={() => handleSubmit()}>
                Добавить
            </MyButtonTwo>
        </div>
    )
}

export default CreateGenre