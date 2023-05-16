import { useEffect, useState } from 'react'
import RequestList from '../../API/RequestList'
import { useFetching } from '../../hooks/useFetching'
import MyButtonTwo from "../../UI/buttonTwo/MyButtonTwo"
import MyLoader from '../../UI/loader/MyLoader'
import { InputNumber, SelectPicker } from 'rsuite'
import classes from './style.module.css'
import MyInput from '../../UI/input/MyInput'

const Print = ({func, ...props}) => {
    const [formats, setFormats] = useState([])
    const [types, setTypes] = useState([])
    const [books, setBooks] = useState([])
    const [cities, setCities] = useState([])
    const [request, setRequest] = useState({book: '', city: '', type: '', format: '', pages: '', count_copies: 1})

    const [fetchType, isTypeLoading, typeError] = useFetching(async () => {
        const obj = await RequestList.getAll('types');
        setTypes([...obj.data.map(item => ({label: item.name, value: item.id }))])
    })

    const [fetchFormat, isFormatLoading, formatError] = useFetching(async () => {
        const list = await RequestList.getAll('format');
        setFormats([...list.data.map(item => ({ label: item.name, value: item.id }))])
    })

    const [fetchBook, isBookLoading, bookError] = useFetching(async () => {
        const list = await RequestList.getAll('books/without_property');
        setBooks([...list.data.map(item => ({ label: item.name, value: item.id }))])
    })

    const [fetchCity, isCityLoading, cityError] = useFetching(async () => {
        const list = await RequestList.getAll('city');
        setCities([...list.data.map(item => ({ label: `${item.name}, ${item.adress}`, value: item.id }))])
    })


    useEffect(() => {
        fetchBook()
        fetchCity()
        fetchFormat()
        fetchType()
    }, [])


    const checkValid = () => {
        return !request.book || !request.city || !request.type || !request.format || !request.pages || !request.count_copies
    }

    return(
        <div className={classes.print}>
            {isTypeLoading || isFormatLoading || isBookLoading || isCityLoading?
                <MyLoader/>
                :
                <>
                    <label>Книга</label>
                    <SelectPicker      
                        data={books} 
                        value={request.book} 
                        onChange={text => setRequest({...request, book: text})} 
                        placeholder={'Книги...'}
                        style={{ width: '70%' }} 
                    />
                    <label>Тип печати</label>
                    <SelectPicker
                        style={{ width: '70%' }} 
                        value={request.type}
                        onChange={selectedSort => setRequest({...request, type: selectedSort})}
                        placeholder = "Тип"
                        data={types}/>
                    <label>Формат</label>
                    <SelectPicker
                        style={{ width: '70%' }} 
                        value={request.format}
                        onChange={selectedSort => setRequest({...request, format: selectedSort})}
                        placeholder = "Формат"
                        data={formats}/>
                    <label>Ориентировочное количество страниц</label>
                    <InputNumber max={1000} min={1} value={request.pages} onChange={text => setRequest({...request, pages: text})} style={{width:'30%'}} placeholder='n-кол.страниц'/>
                    <label>Тираж</label>
                    <InputNumber max={20} min={1} value={request.count_copies} onChange={text => setRequest({...request, count_copies: text})} style={{width:'30%'}}/>
                    <label>Адрес</label>
                    <SelectPicker
                        style={{ width: '70%' }} 
                        value={request.city}
                        onChange={selectedSort => setRequest({...request, city: selectedSort})}
                        placeholder = "Город"
                        data={cities}/>
                    <MyButtonTwo disabled={checkValid()} style={{marginTop: '5%'}} onClick={() => func(request)}>Запрос</MyButtonTwo>
                </>
            }
        </div>
    )
}

export default Print