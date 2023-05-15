import classes from './style.module.css'
import { Rate } from 'rsuite';

const CommentItem = ({role, callback, obj}) => {
    return(
        <div className={classes.commentsItem} style={{margin: '5px'}}>
            {role >= 2 && <div onClick={() => callback(obj.id)} className={classes.delete}>Удалить</div>}
            <div className={classes.user}>{obj.user.username}</div>
            <div><Rate readOnly defaultValue={obj.rating} size="xs"/></div>
            <div className={classes.description}>{obj.description}</div>
            <div className={classes.little}>Дата создания: {new Date(obj.created).toLocaleString()}</div>
        </div>
    )
}

export default CommentItem