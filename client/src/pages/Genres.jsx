import { useEffect, useState } from "react";
import RequestList from "../API/RequestList";
import { useFetching } from "../hooks/useFetching";
import GenresItem from "../utils/genre";

const Genres = () => {
    const [genres, setGenres] = useState([])

    const [fetchGenres, isGenresLoading, genreError] = useFetching(async () => {
        const list = await RequestList.getAll('genres');
        setGenres([...list.data])
    })

    useEffect(() => {
        fetchGenres()
    },[])

    return(
        <article style={{ flexWrap: 'wrap', flexDirection: 'row'}}>
            {genres.map((e, i) => <GenresItem key={i} obj={e}/>)}
        </article>
    )
}

export default Genres 