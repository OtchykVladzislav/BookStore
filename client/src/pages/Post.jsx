import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MyButton from "../UI/button/MyButton"
import { useSelector } from "react-redux";
import MyModal from "../UI/modal/MyModal";
import Order from "../form/order";
import CommentItem from "../utils/Comments/CommentItem";
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import MyLoader from "../UI/loader/MyLoader";


const Post = () => {
    const param = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const token = useSelector(state => state.token)
    const [modal, setModal] = useState(false)

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const obj = await RequestList.getById(param.id, 'books');
        setPost({...obj.data})
    })

    const [fetchComment, isCommentLoading, commentError] = useFetching(async () => {
        const list = await RequestList.getComments(param.id);
        setComments([...list.data])
    })



    useEffect(() => {
        fetchComment()
        fetchPost()
    }, [])

    return(
        <article className="post">
            <MyModal visible={modal} setVisible={setModal}><Order/></MyModal>
            {isPostLoading || isCommentLoading ? <MyLoader/> :
                <>
                    <div className="postTitle">{post.name}</div>
                    <div className="postInfo">
                        <img className="postImage" src={`../${'book1'}.png`}/>
                        <div className="postText">
                            <div>Жанры: {post.genres.map(e => { return e.name }).join(',')}</div>
                            <div>Дата публикации: {new Date(post.publish_date).toLocaleDateString()}</div>
                            <div>Автор: {post.author}</div>
                            <div className="postPrice">{post.price} BYN</div>
                            {!token? <div>Войдите в аккаунт, чтобы купить</div> : <MyButton onClick={() => setModal(true)}>Купить</MyButton>}
                        </div>
                    </div>
                    <div className="postDescription">
                        <span>Описание:</span>
                        {post.description}
                    </div>
                    <div className="postComments">
                        {!comments.length? "Нет отзывов": comments.map((e,i) => <CommentItem key={i} obj={e}/>)}
                    </div>
                </>
            }
        </article>
    )
}

export default Post