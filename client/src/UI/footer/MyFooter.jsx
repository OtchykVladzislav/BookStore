import { useEffect, useState } from "react";
import RequestList from "../../API/RequestList";
import { useFetching } from "../../hooks/useFetching";
import classes from "./MyFooter.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {faVk, faTelegram} from '@fortawesome/free-brands-svg-icons'


const MyFooter = () => {
    const [data, setData] = useState([])
    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        const list = await RequestList.getAll('city');
        setData([...list.data])
    })

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <footer className={classes.footer}>
            <div className={classes.block}>
                <span className={classes.location}><FontAwesomeIcon icon={faLocationDot} /> {data.map(e => `${e.name}, ${e.adress}`).join(', ')}</span>
                <span><FontAwesomeIcon icon={faClock} /> пн.-сб. 09:00 - 20:00</span>
                <span><FontAwesomeIcon icon={faArrowRight} /> Прием запросов онлайн: 24/7</span>
                <span><FontAwesomeIcon icon={faEnvelope} /> text@gmail.com</span>
                <span><FontAwesomeIcon icon={faPhone} /> +375(29)4437897</span>
            </div>
            <div className={classes.social_media}><a href="https://vk.com/"><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faVk} /></a> <a href="https://web.telegram.org/"><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTelegram} /></a> </div>
        </footer>
    )
}

export default MyFooter