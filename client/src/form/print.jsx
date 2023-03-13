import { useState } from 'react'
import MyButtonTwo from "../UI/buttonTwo/MyButtonTwo"
import MySelect from "../UI/select/MySelect"

const Print = ({array, ...props}) => {
    const [color, setColor] = useState(null)
    const [format, setFormat] = useState(null)
    const [pages, setPages] = useState('')
    const [countCopies, setCountCopies] = useState(1)

    const validate = (value) => {
        if(+value < 0) return setCountCopies(1)
        if(+value > 20) return setCountCopies(20)
        return setCountCopies(+value)
    }

    return(
        <div className='print'>
            <label>Тип печати</label>
            <MySelect
                value={color}
                onChange={selectedSort => setColor(selectedSort)}
                options={[
                    {value: 'Черно-белая печать', name: 'Черно-белая печать'},
                    {value: 'Черно-белая матовая', name: 'Черно-белая матовая'},
                    {value: 'Черно-белая глянцевая', name: 'Черно-белая глянцевая'},
                    {value: 'Цветная', name: 'Цветная'},
                    {value: 'Цветная матовая', name: 'Цветная матовая'},
                    {value: 'Цветная глянцевая', name: 'Цветная глянцевая'}
            ]}/>
            <label>Формат</label>
            <MySelect
                value={format}
                onChange={selectedSort => setFormat(selectedSort)}
                options={[
                    {value: 'A1', name: 'A1'},
                    {value: 'A2', name: 'A2'},
                    {value: 'A3', name: 'A3'},
                    {value: 'A4', name: 'A4'},
                    {value: 'A5', name: 'A5'}
                ]}/>
            <label>Ориентировочное количество страниц</label>
            <input type="text" value={pages} onChange={e => setPages(e.target.value)} style={{width:'7vw', height:'30px'}}/>
            <label>Тираж</label>
            <input type="number" value={countCopies} onChange={e => validate(e.target.value)} style={{width:'5vw', height:'30px'}} min={1} max={20}/>
            <MyButtonTwo onClick={props.func}>Запрос</MyButtonTwo>
        </div>
    )
}

export default Print