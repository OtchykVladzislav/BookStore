import classes from './style.module.css'

const CommentItem = ({obj}) => {
    return(
        <div className={classes.commentsItem} style={{margin: '5px'}}>
            <div className={classes.user}>{obj.user.username}</div>
            <div className={classes.description}>{obj.description}</div>
            <div className={classes.rating}><span>{obj.rating}</span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg></div>
            <div className={classes.little}>Дата создания: {new Date(obj.created).toLocaleString()}</div>
        </div>
    )
}

export default CommentItem