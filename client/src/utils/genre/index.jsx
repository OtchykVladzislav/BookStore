import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import PageIcon from '@rsuite/icons/Page';
import { useBase64 } from "../../hooks/useArrayBufferToBase64";

const GenresItem = ({obj}) => {
    const navigate = useNavigate()
    return(
        <div className={classes.block} onClick={() => navigate(`/genres/${obj.id}`)}> 
            {obj.image? <img className={classes.img} style={{width: '100%'}} src={useBase64(obj.image.picByte.data, obj.image.type)} /> : <PageIcon className={classes.img}/>}
            <p>{obj.name}</p>
        </div>
    )
}

export default GenresItem