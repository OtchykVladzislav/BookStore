import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import PostFilter from "../utils/PostFilter";
import { useQuery } from "../hooks/useSort";
import Pagination from "../utils/Pagination";
import { Link } from "react-router-dom";
import MyLoader from "../UI/loader/MyLoader";
import PostList from "../utils/PostList";

export default function Posts(){
    const [posts, setPosts] = useState([{id: 1, title: 'Book1', genre: 'Horror', price: 25}, {id: 2, title: 'Book2', genre: 'Battle', price: 35}, {id: 3, title: 'Book3', genre: 'Genetic', price: 44}, {id: 4, title: 'Book1', genre: 'Horror', price: 25}, {id: 5, title: 'Book2', genre: 'Battle', price: 35}, {id: 6, title: 'Book3', genre: 'Genetic', price: 44}, {id: 7, title: 'Book1', genre: 'Horror', price: 25}, {id: 8, title: 'Book2', genre: 'Battle', price: 35}, {id: 9, title: 'Book3', genre: 'Genetic', price: 44}, {id: 10, title: 'Book3', genre: 'Genetic', price: 70}])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedArray = useQuery(posts, filter.sort, filter.query)
    const [page, setPage] = useState(1)
    const arrayPart = usePagination(sortedArray, page, 9)
    const countPages = Math.ceil(sortedArray.length / 9)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setPage(1)
        setLoading(false)
    }, [filter])

    return (
        <article className="posts">
            <PostFilter filter={filter} setFilter={setFilter}/>
            {loading? <MyLoader/> : <PostList array={arrayPart}/>}
            {arrayPart.length != 0 && <Pagination count={countPages} obj={page} setObj={setPage}/>}
        </article>
    )
}