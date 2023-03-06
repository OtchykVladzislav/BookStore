import { Link } from "react-router-dom"
import PostItem from "./PostItem"

const PostList = ({array}) => {
    return(
        <div className="postList">
            {!array.length? <div className="warning">Нет элементов</div> : array.map((e, i) => <Link key={i} to={`/posts/${e.id}`}><PostItem obj={e}/></Link>)}
        </div>
    )
}

export default PostList