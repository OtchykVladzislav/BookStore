import { useEffect, useState } from "react";
import MyModal from "../UI/modal/MyModal"
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import PostFilter from "../utils/post/PostFilter";

const TableBook = () => {
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
    useEffect(() => {
        filter.sort ? fetchPosts('filter') : fetchPosts('list')
    }, [page, filter.sort])

    const searchItem = () => {
        fetchPosts('filter')
    }

    console.log(list)

    return(
        <article className="post">
            <h1>Таблица книг</h1>
            <PostFilter callback={searchItem} filter={filter} setFilter={setFilter}/>
            <table className="tableFuel">
                <thead>
                    <tr>
                        <th>Вид нефтепродукта</th>
                        <th>Резервуар</th>
                        <th>Объём</th>
                        <th>Масса</th>
                        <th>АЗС</th>
                        <th>Стоимость</th>
                        <th>Дата и время</th>
                        <th>Номер заказа</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((e, i) => 
                        <tr key={i}>
                            <td>{e}</td>
                            <td>{e}</td>
                            <td>{e}</td>
                            <td>{e}</td>
                            <td>{e}</td>
                            <td>{e.cost}</td>
                            <td>{new Date(e).toLocaleDateString()}</td>
                            <td>{e}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {countPage != 1 && <Pagination count={countPage} obj={page} setObj={setPage}/>}
        </article>
    )
}

export default TableBook