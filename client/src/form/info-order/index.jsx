import { useEffect, useState } from 'react';
import classes from './style.module.css'
import { useFetching } from '../../hooks/useFetching';
import RequestList from '../../API/RequestList';

const InfoOrder = ({id}) => {
    const [obj, setObj] = useState({})

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const response = await RequestList.getById(id, 'orders');
        setObj({...response.data})
    })
    useEffect(() => {
        fetchPost()
    }, [id])

    return(
        <div className={classes.block} onClick={(e) => {e.stopPropagation()}}>
            {!isPostLoading && <><h1>Сводка</h1>
                <div className={classes.line}><span className={classes.title}>Книги:</span><span style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>{obj.books.map((e, i) => {return <span key={i}>{obj.order_book[i].count} x {e.name + ', ' + e.author}</span>})}</span></div>
                <div className={classes.line}><span className={classes.title}>Оплата:</span><span>{obj.is_card? 'Оплата картой' : 'Оплата наличными'}</span></div>
                <div className={classes.line}><span className={classes.title}>Выбранный адресс магазина</span><span>{obj.city.name}, {obj.city.adress}</span></div>
            </>}
        </div>
    )
}

export default InfoOrder