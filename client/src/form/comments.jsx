import { useState, useEffect } from "react"
import MyButton from "../UI/button/MyButton"
import MySelect from "../UI/select/MySelect"


const FormComment = ({...props}) => {
    const [comment, setComment] = useState({rating: 1, description: 'Ничего'})

    const send = () => {
        console.log(comment)
        props.setVisible(false)
    }

    useEffect(() => setComment({rating: 1, description: 'Ничего'}), [props.visible])
    
    return(
        <div className="formCreateComments" onClick={e => e.stopPropagation()}>
            <label>Описание</label>
            <textarea type='text' value={comment.description} onChange={e => setComment({...comment, description: e.target.value})} placeholder={'Комментарий....'}/>
            <label>Рэйтинг</label>
            <MySelect
                value={comment.rating}
                onChange={selectedSort => setComment({...comment, rating: +selectedSort})}
                defaultValue = "Выберите число"
                options={[1,2,3,4,5].map(e => {return {value: e, name: e}})}
            /> 
            <MyButton onClick={send}>Оставить отзыв</MyButton>
        </div>
    )
}

export default FormComment

