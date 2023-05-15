import { Link } from "react-router-dom"
import PostItem from "./PostItem"
import { useFetching } from "../../hooks/useFetching";
import RequestList from "../../API/RequestList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const PostList = ({array, callback}) => {
    const token = useSelector(state => state.token.token)
    const [decode, setDecode] = useState('')
    const [fetchPost, isPostLoading, postError] = useFetching(async (e) => {
        await RequestList.getById(e.id, 'books/stolen');
        callback()
    })

    useEffect(() => {
        if(token) setDecode(jwtDecode(token))
    }, [])

    return(
        <div className="postList">
            {!array.length? <div className="warning">Нет элементов</div> : array.map((e, i) => <Link style={{color: 'white'}} key={i} to={`/posts/${e.id}`}><PostItem obj={e} weight={decode.roleWeight} callback={fetchPost}/></Link>)}
        </div>
    )
}

export default PostList