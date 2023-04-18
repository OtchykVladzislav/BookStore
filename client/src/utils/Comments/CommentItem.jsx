const CommentItem = ({obj}) => {
    return(
        <div className="commentsItem" style={{margin: '5px'}}>
            <div className="user">{obj.user.username}</div>
            <div className="description">{obj.description}</div>
            <div className="little">Рэйтинг: {obj.rating}</div>
            <div className="little">Дата создания: {new Date(obj.created).toLocaleDateString()}</div>
        </div>
    )
}

export default CommentItem