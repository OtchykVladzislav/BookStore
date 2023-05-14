import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MyButton from "../UI/button/MyButton"
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "../utils/comment";
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import MyLoader from "../UI/loader/MyLoader";
import CreateComment from "../form/create-comment";
import jwtDecode from "jwt-decode";


const Post = () => {
    const param = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const token = useSelector(state => state.token.token)
    const [decode, setDecode] = useState('')
    const [access, setAccess] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const obj = await RequestList.getById(param.id, 'books');
        setPost({...obj.data})
    })

    const [fetchComment, isCommentLoading, commentError] = useFetching(async () => {
        const list = await RequestList.getComments(param.id);
        if(list.data.filter(e => e.username == decode.username).length != 0) setAccess(false)
        setComments([...list.data])
    })

    const [fetchAddComment, isAddCommentLoading, addCommentError] = useFetching(async (comment) => {
        const obj = await RequestList.addElem('comments', comment);
        obj.data.user.username = decode.username
        setComments([...comments, obj.data])
        setAccess(false)
    })

    const addToCart = () => {
        dispatch({type: 'ADD_CART', payload: post.id})
        navigate('/cart')
    }

    const add = (obj) => {
        const comment = {description: obj.description, rating: obj.rating, book: post, created: new Date().toLocaleDateString()}
        fetchAddComment(comment)
    }

    useEffect(() => {
        if(token) setDecode(jwtDecode(token))
        fetchComment()
        fetchPost()
    }, [])

    return(
        <article className="post">
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
                            {!token ? <div>Войдите в аккаунт, чтобы купить</div> : <MyButton onClick={() => addToCart()}>Добавить в корзину</MyButton>}

                        </div>
                    </div>
                    <div className="postDescription">
                        <span>Описание:</span>
                        {post.description}
                    </div>
                    <div className="postComments">
                        {access && <CreateComment callback={add}/>}
                        {!comments.length? "Нет отзывов": comments.map((e,i) => <CommentItem key={i} obj={e}/>)}
                    </div>
                </>
            }
        </article>
    )
}

export default Post