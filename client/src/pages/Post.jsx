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
import PageIcon from '@rsuite/icons/Page';
import { useBase64 } from "../hooks/useArrayBufferToBase64";


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

    const remove = (id) => {
        RequestList.delById(id, 'comments');
        setComments([...comments.filter(e => e.id != id)])
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
                        {post.image? <img className={"postImage"} style={{width: '45%'}} src={useBase64(post.image.picByte.data, post.image.type)} /> : <PageIcon className={"postImage"}/>} 
                        <div className="postText">
                            <div>Жанры: {post.genres.map(e => { return e.name }).join(',')}</div>
                            <div>Дата публикации: {new Date(post.publish_date).toLocaleDateString()}</div>
                            <div>Автор: {post.author}</div>
                            <div className="postPrice">{post.price} BYN</div>
                            {!token ? <div>Войдите в аккаунт, чтобы купить</div> : post.stolen ? <div className="warning">Товар закончился</div> : <MyButton onClick={() => addToCart()}>Добавить в корзину</MyButton>}

                        </div>
                    </div>
                    <div className="postDescription">
                        <span>Описание:</span>
                        {post.description}
                    </div>
                    <div className="postComments">
                        {access && token && <CreateComment callback={add}/>}
                        {!comments.length? "Нет отзывов": comments.map((e,i) => <CommentItem key={i} role={decode.roleWeight} callback={remove} obj={e}/>)}
                    </div>
                </>
            }
        </article>
    )
}

export default Post