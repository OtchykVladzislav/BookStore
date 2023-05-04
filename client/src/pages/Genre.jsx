import { useEffect, useState } from "react";
import RequestList from "../API/RequestList";
import MyLoader from "../UI/loader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import Pagination from "../utils/Pagination";
import PostFilter from "../utils/post/PostFilter";
import PostList from "../utils/post/PostList";
import { useParams } from "react-router-dom";

const Genre = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [page, setPage] = useState(1)
    const limit = 9
    const [countPage, setCountPage] = useState(1)
    const params = useParams()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (str) => {
        switch(str){
            case 'list':
                const list = await RequestList.getAll(`books/genre/${params.id}`, limit,  page);
                setPosts([...list.data[0]])
                const countList = Math.ceil(list.data[1]/limit)
                setCountPage(countList)
                break;
            case 'filter':
                const searchList = await RequestList.filterItems(`books/genre/${params.id}`, filter.query, filter.sort, limit, page);
                setPosts([...searchList.data[0]])
                const countSearchList = Math.ceil(searchList.data[1]/limit)
                setCountPage(countSearchList)
                break;
        }
    })

    console.log(posts)
    useEffect(() => {
        filter.query || filter.sort ? fetchPosts('filter') : fetchPosts('list')
    }, [page, filter])

    return (
        <article className="posts">
            <PostFilter filter={filter} setFilter={setFilter}/>
            {isPostsLoading? <MyLoader/> : <PostList array={posts}/>}
            {countPage != 1 && <Pagination count={countPage} obj={page} setObj={setPage}/>}
        </article>
    )
}

export default Genre