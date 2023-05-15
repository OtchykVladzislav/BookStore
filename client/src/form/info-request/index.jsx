import { useEffect, useState } from 'react';
import classes from './style.module.css'
import { useFetching } from '../../hooks/useFetching';
import RequestList from '../../API/RequestList';

const InfoRequest = ({id}) => {
    const [obj, setObj] = useState({})

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const response = await RequestList.getById(id, 'requests');
        setObj({...response.data})
    })
    useEffect(() => {
        fetchPost()
    }, [id])

    console.log(obj)
    return(
        <div className={classes.block} onClick={(e) => {e.stopPropagation()}}>
            {!isPostLoading && <>
            <h1>Сводка</h1>
            <div className={classes.line}><span className={classes.title}>Название книги и автор</span><span>{obj.book.name},{obj.book.author}</span></div>
            <div className={classes.line}><span className={classes.title}>Формат</span><span>{obj.format.name}</span></div>
            <div className={classes.line}><span className={classes.title}>Тип</span><span>{obj.type.name}</span></div>
            <div className={classes.line}><span className={classes.title}>Выбранный адресс магазина</span><span>{obj.city.name}, {obj.city.adress}</span></div>
            </>}
        </div>
    )
}

export default InfoRequest