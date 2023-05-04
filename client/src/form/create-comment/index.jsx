import { useEffect, useState } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'

const CreateComment = ({callback}) => {
    const [comment, setComment] = useState({rating: 0, description: ''})

    const send = () => {
        if(comment.rating) callback(comment)
    }

    return(
        <div className={classes.form}>
            <div className={classes.rating} onClick={e => setComment({...comment, rating: +e.target.value})}>
                <input value="5" name="star-radio" id="star-1" type="radio" />
                <label htmlFor="star-1">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                </label>
                <input value="4" name="star-radio" id="star-2" type="radio"/>
                <label htmlFor="star-2">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                </label>
                <input value="3" name="star-radio" id="star-3" type="radio"/>
                <label htmlFor="star-3">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                </label>
                <input value="2" name="star-radio" id="star-4" type="radio"/>
                <label htmlFor="star-4">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                </label>
                <input value="1" name="star-radio" id="star-5" type="radio"/>
                <label htmlFor="star-5">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                </label>
            </div>
            <textarea type='text' value={comment.description} onChange={e => setComment({...comment, description: e.target.value})} placeholder={'Комментарий....'}/>
            <MyButton onClick={send}>Оставить отзыв</MyButton>
        </div>
    )
}

export default CreateComment