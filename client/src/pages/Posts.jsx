import React, { useEffect, useState } from "react";
import PostFilter from "../utils/Post/PostFilter";
import Pagination from "../utils/Pagination";
import MyLoader from "../UI/loader/MyLoader";
import PostList from "../utils/Post/PostList";
import PostGenre from "../utils/Post/PostGenre";
import {useFetching} from "../hooks/useFetching";
import RequestList from "../API/RequestList";

export default function Posts(){
    const [posts, setPosts] = useState([])
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState('')
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [page, setPage] = useState(1)
    const limit = 9
    const [countPage, setCountPage] = useState(1)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (str) => {
        switch(str){
            case 'list':
                const list = await RequestList.getAll('books', limit,  page);
                setPosts([...list.data[0]])
                const countList = Math.ceil(list.data[1]/limit)
                setCountPage(countList)
                break;
            case 'filter':
                const searchList = await RequestList.filterItems('books', filter.query, filter.sort, limit, page);
                setPosts([...searchList.data[0]])
                const countSearchList = Math.ceil(searchList.data[1]/limit)
                setCountPage(countSearchList)
                break;
        }
    })

    const [fetchGenres, isGenresLoading, genreError] = useFetching(async () => {
        const list = await RequestList.getAll('genres');
        setGenres([...list.data])
    })

    useEffect(() => {
        fetchGenres()
    },[])

    useEffect(() => {
        filter.query || filter.sort ? fetchPosts('filter') : fetchPosts('list')
    }, [page, filter])

    return (
        <article className="posts">
            <PostFilter filter={filter} setFilter={setFilter}/>
            {isGenresLoading && isPostsLoading? <MyLoader/> :  
                <>
                    <PostGenre array={genres} genre={genre} setGenre={setGenre}/>
                    <PostList array={posts}/>
                </>
            }
            {countPage != 1 && <Pagination count={countPage} obj={page} setObj={setPage}/>}
        </article>
    )
}