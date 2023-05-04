import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'

const GenresItem = ({obj}) => {
    const navigate = useNavigate()
    return(
        <div className={classes.block} onClick={() => navigate(`/genres/${obj.id}`)}> 
            <p>{obj.name}</p>
        </div>
    )
}

export default GenresItem