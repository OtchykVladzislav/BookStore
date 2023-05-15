import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'
import { Message, Uploader, useToaster } from 'rsuite'

const ChangeImageBook = ({obj, str, visible, setVisible}) => {
    const toaster = useToaster();
    const [form, setFormValue] = useState({});

    const [fetchAdd, isAddLoading, addError, setAddError] = useFetching(async () => {
        if(!obj.image) {
            await RequestList.addElem(str, form)
            return;
        }
        await RequestList.putById(obj.image.id, str, form)
        toaster.push(<Message type="success">Картинка измениться когда перезайдете</Message>);
    })

    const handleSubmit = () => {
        if(form != {}){
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
        setFormValue({name: event.name, type: event.type, picByte: base64})
    };

    useEffect(() => {
        setFormValue({})
        setAddError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {addError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <div>
                <Uploader
                    fileListVisible={false}
                    autoUpload={false}
                    listType='picture'
                    onChange={file => {
                        uploadImage(file[file.length - 1].blobFile)
                    }}
                />
                <span>{form.name}</span>
            </div>
            <MyButtonTwo disabled={form == {}} onClick={() => handleSubmit()}>
                Обновить
            </MyButtonTwo>
        </div>
    )
}

export default ChangeImageBook