import { useEffect, useState } from "react"
import MyButton from "../../UI/button/MyButton"
import classes from './style.module.css'
import { Rate } from "rsuite"

const textStyle = {
    verticalAlign: 'top',
    lineHeight: '42px',
    display: 'inline-block'
};

const CreateComment = ({callback}) => {
    const [comment, setComment] = useState({rating: 0, description: ''})

    const send = () => {
        if(comment.rating) callback(comment)
    }

    const texts = {
        1: 'Bad',
        2: 'No intrested',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
    };

    return(
        <div className={classes.form}>
            <Rate defaultValue={0} value={comment.rating} onChange={e => setComment({...comment, rating: e})} size="lg"/>
            <span style={textStyle}>{texts[comment.rating]}</span>
            <textarea type='text' value={comment.description} onChange={e => setComment({...comment, description: e.target.value})} placeholder={'Комментарий....'}/>
            <MyButton onClick={send}>Оставить отзыв</MyButton>
        </div>
    )
}

export default CreateComment