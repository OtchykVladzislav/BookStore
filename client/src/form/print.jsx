import { useEffect, useState } from 'react'
import RequestList from '../API/RequestList'
import { useFetching } from '../hooks/useFetching'
import MyButtonTwo from "../UI/buttonTwo/MyButtonTwo"
import MyLoader from '../UI/loader/MyLoader'
import MySelect from "../UI/select/MySelect"

const Print = ({array, ...props}) => {
    const [formats, setFormats] = useState([])
    const [types, setTypes] = useState([])
    const [type, setType] = useState('')
    const [format, setFormat] = useState('')
    const [pages, setPages] = useState('')
    const [countCopies, setCountCopies] = useState(1)

    const [fetchType, isTypeLoading, typeError] = useFetching(async () => {
        const obj = await RequestList.getAll('types');
        setTypes([...obj.data])
    })

    const [fetchFormat, isFormatLoading, formatError] = useFetching(async () => {
        const list = await RequestList.getAll('format');
        setFormats([...list.data])
    })


    useEffect(() => {
        fetchFormat()
        fetchType()
        console.log(typeError + '\n' + formatError)
    }, [])


    const validate = (value) => {
        if(+value < 0) return setCountCopies(1)
        if(+value > 20) return setCountCopies(20)
        return setCountCopies(+value)
    }

    return(
        <div className='print'>
            {isTypeLoading || isFormatLoading?
                <MyLoader/>
                :
                <>
                    <label>Тип печати</label>
                    <MySelect
                        value={type}
                        onChange={selectedSort => setType(selectedSort)}
                        defaultValue = "Тип"
                        options={types.map(e => {return {value: e.name, name: e.name}})}/>
                    <label>Формат</label>
                    <MySelect
                        value={format}
                        onChange={selectedSort => setFormat(selectedSort)}
                        defaultValue = "Формат"
                        options={formats.map(e => {return {value: e.name, name: e.name}})}/>
                    <label>Ориентировочное количество страниц</label>
                    <input type="text" value={pages} onChange={e => setPages(e.target.value)} style={{width:'7vw', height:'30px'}}/>
                    <label>Тираж</label>
                    <input type="number" value={countCopies} onChange={e => validate(e.target.value)} style={{width:'5vw', height:'30px'}} min={1} max={20}/>
                    <MyButtonTwo onClick={props.func}>Запрос</MyButtonTwo>
                </>
            }
        </div>
    )
}

export default Print