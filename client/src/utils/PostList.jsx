import { Link } from "react-router-dom"
import PostItem from "../utils/PostItem"

const PostList = ({array}) => {
    return(
        <div className="postList">
            {!array.length? <div className="warning">Нет элементов</div> : array.map((e, i) => <Link to={`/posts/${e.id}`}><PostItem key={e.id} obj={e}/></Link>)}
        </div>
    )
}

export default PostList