import { useEffect, useRef, useState } from 'react'
import classes from './style.module.css'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import Alert from '../../UI/alert'
import MyInput from '../../UI/input/MyInput'
import MyButtonTwo from '../../UI/buttonTwo/MyButtonTwo'
import { InputNumber, SelectPicker, Uploader } from 'rsuite'

const CreateBook= ({data, setData, visible, setVisible}) => {
    const [form, setFormValue] = useState({name: '', author: '', description: '', price: 0, publish_date: '2002-06-12', image: {}});
    const [genre, setGenre] = useState(0)
    const [genres, setGenres] = useState([])
    const [list, setList] = useState([])

    const [fetchAdd, isAddLoading, addError, setAddError] = useFetching(async (e) => {
        let obj = await RequestList.addElem('image_book/create_book', e);
        const arr = data
        arr.unshift(obj.data)
        setData([...arr])
    })

    const [fetchGenre, isGenreLoading, genreError] = useFetching(async () => {
        const obj = await RequestList.getAll('genres');
        setGenres([...obj.data.map(item => ({label: item.name, value: item.id }))])
    })

    const handleSubmit = () => {
        if(form.name && form.author && form.description && form.price && form.publish_date && list.length != 0 && form.image.name){
            const obj = {...form, genres: [...list.map(e => {return {id: e.value, name: e.label}})]}
            fetchAdd(obj)
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

    const addElem = () => {
        if(genre){
            const item = genres.find(e => e.value == genre)
            setList([...list, {value: genre, label: item.label}])
            setGenres([...genres.filter(e => e.value != genre)])
            setGenre(0)
        }
    }

    const callbackRem = (index,value, name) => {
        const arr = list
        arr.splice(index, 1)
        setGenres([...genres, {value, label: name}])
        setList([...arr])
    }

    const uploadImage = async (event) => {
        const base64 = await convertBase64(event);
        setFormValue({...form, image: {name: event.name, type: event.type, picByte: base64}})
    };

    useEffect(() => {
        if(visible) fetchGenre()
        setFormValue({name: '', author: '', description: '', price: '', publish_date: '', genres: [], image: {}})
        setList([])
        setGenre(0)
        setAddError(false)
    }, [visible])

    return(
        <div
            className={classes.change_box}
            onClick={e => e.stopPropagation()}
        >
            {addError && <Alert style={{fontSize: 15}}>Ошибка с сервера</Alert>}
            <div className={classes.box}>
                <label>Название</label>
                <MyInput value={form.name} change={selected => setFormValue({...form, name: selected})} />
            </div>
            <div className={classes.box}>
                <label>Автор</label>
                <MyInput value={form.author} change={selected => setFormValue({...form, author: selected})} />
            </div>
            <div className={classes.box}>
                <label>Описание</label>
                <MyInput style={{resize: 'none', height: 200}} as="textarea" value={form.description} change={selected => setFormValue({...form, description: selected})} />
            </div>
            <div className={classes.box}>
                <label>Цена</label>
                <InputNumber min={5} max={10000} value={form.price} onChange={selected => setFormValue({...form, price: selected})} />
            </div>
            <MyInput type='date' menuStyle={{ zIndex: 700}} value={form.publish_date} change={selected => setFormValue({...form, publish_date: selected})} />
            <SelectPicker menuStyle={{ zIndex: 700}} data={genres} value={genre} onChange={selected => setGenre(selected)} placeholder="Жанры...."/>
            <MyButtonTwo style={{marginTop: '15px'}} disabled={!genre} onClick={() => addElem()}>+</MyButtonTwo>
            {list.length != 0 && 
                <div className={classes.list}>
                    {list.map((e,i) => <span><span>{e.label}</span><span style={{cursor: 'pointer'}} className={classes.cross} onClick={() => callbackRem(i, e.value,e.label)}>&#10539;</span></span>)}
                </div>
            }
            <div className={classes.box}>
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
            <MyButtonTwo disabled={!form.name || !form.author || !form.description || !form.price || !form.publish_date || list.length == 0 || form.image == {}} onClick={() => handleSubmit()}>
                Добавить
            </MyButtonTwo>
        </div>
    )
}

export default CreateBook