import { useState } from 'react'
import Select from 'react-select'
import MyButtonTwo from "../UI/buttonTwo/MyButtonTwo"
import MySelect from "../UI/select/MySelect"

const Print = ({array, ...props}) => {
    const [whiteBlack, setWhiteBlack] = useState(true)
    const [pages, setPages] = useState('')
    const [countCopies, setCountCopies] = useState(1)

    const validate = (value) => {
        if(+value < 0) return setCountCopies(1)
        if(+value > 20) return setCountCopies(20)
        return setCountCopies(+value)
    }

    return(
        <div className='print'>
            <label>Книга</label>
            <Select styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '20vw'
                        }),
                    }}
                    options={array.map(e => {return {value: e.id, label: e.title}})}
            />
            <label>Тип печати</label>
            <MySelect
                value={whiteBlack}
                onChange={selectedSort => setWhiteBlack(selectedSort)}
                defaultValue = "Черно-белая печать"
                options={[
                    {value: true, name: 'Да'},
                    {value: false, name: 'Нет'}
            ]}/>
            <label>Страницы(необязательно)</label>
            <input type="text" value={pages} onChange={e => setPages(e.target.value)} style={{width:'20vw', height:'30px'}} placeholder={'Формат начало-конец'}/>
            <label>Тираж</label>
            <input type="number" value={countCopies} onChange={e => validate(e.target.value)} style={{width:'5vw', height:'30px'}} min={1} max={20}/>
            <MyButtonTwo onClick={props.func}>Запрос</MyButtonTwo>
        </div>
    )
}

export default Print