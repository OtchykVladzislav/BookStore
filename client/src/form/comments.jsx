import { useState } from "react"
import MyButton from "../UI/button/MyButton"

const FormComment = () => {
    const [comment, setComment] = useState({rating: 0, description: ''})

    const send = () => {
        console.log(comment)
    }
    
    return(
        <div>
            <MyInput value={description} onChange={e => setComment({...comment, description: e.target.value})} placeholder={'Комментарий'}/>
            <input type="number" min={0} max={5}/>
            <MyButton onClick={send}/>
        </div>
    )
}

export default FormComment

