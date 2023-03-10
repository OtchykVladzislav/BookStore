import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MyButton from "../UI/button/MyButton"
import { useSelector } from "react-redux";
import MyModal from "../UI/modal/MyModal";
import Order from "../form/order";
import CommentItem from "../utils/Comments/CommentItem";


const Post = () => {
    const param = useParams()
    const [posts, setPosts] = useState([{id: 1, title: 'Book1', genre: 'Horror', price: 25, description: `В этот том серии "Гангстерский детектив" вошли романы "Стеклянный ключ" (1931 г.) и "Худой мужчина" (1934 г.), повесть "Большой налет", а также новеллы "Обгоревшая фотография", "Дом на Турк-стрит" и "Девушка с серебряными глазами" известного американского мастера остросюжетного детектива Дэшила Хэммета (1894 - 1961 гг.).`}, {id: 2, title: 'Book2', genre: 'Battle', price: 35}, {id: 3, title: 'Book3', genre: 'Genetic', price: 44}, {id: 4, title: 'Book1', genre: 'Horror', price: 25}, {id: 5, title: 'Book2', genre: 'Battle', price: 35}, {id: 6, title: 'Book3', genre: 'Genetic', price: 44}, {id: 7, title: 'Book1', genre: 'Horror', price: 25}, {id: 8, title: 'Book2', genre: 'Battle', price: 35}, {id: 9, title: 'Book3', genre: 'Genetic', price: 44}, {id: 10, title: 'Book3', genre: 'Genetic', price: 70}])
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([{rating: 5, description: 'Говно', user: {username: "Saske",createAt: "2021-02-01"}}])
    const token = useSelector(state => state.token)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setPost({...posts.find(e => e.id == param.id)})
    }, [])

    return(
        <article className="post">
            <MyModal visible={modal} setVisible={setModal}><Order/></MyModal>
            <div className="postTitle">{post.title}</div>
            <div className="postInfo">
                <img className="postImage" src={`../${'book1'}.png`}/>
                <div className="postText">
                    <div>Жанр: {post.genre}</div>
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
        </article>
    )
}

export default Post