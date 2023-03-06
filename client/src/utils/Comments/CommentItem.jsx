const CommentItem = ({obj}) => {
    return(
        <div className="commentsItem">
            <div className="user">{obj.user.username}</div>
            <div className="description">{obj.description}</div>
            <div className="little">Рэйтинг: {obj.rating}</div>
            <div className="little">Дата создания: {new Date(obj.user.createAt).toLocaleDateString()}</div>
        </div>
    )
}

export default CommentItem