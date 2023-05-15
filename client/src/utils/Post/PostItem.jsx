import PageIcon from '@rsuite/icons/Page';
import classes from '../genre/style.module.css'
import { useBase64 } from '../../hooks/useArrayBufferToBase64';

const PostItem = ({obj, weight, callback}) => {
    return(
        <div className="item">
            <div className="postImage">
                {obj.image? <img className={classes.img} style={{width: '100%'}} src={useBase64(obj.image.picByte.data, obj.image.type)} /> : <PageIcon className={classes.img}/>}
            </div>
            <div className="infoBlock">
                <div className="title">{obj.name}</div>
                <div className="price">{obj.price} BYN</div>
                <div className="genre">{obj.genres.map(e => { return e.name }).join(',')}</div>
            </div>
            {!obj.stolen && weight >= 2 && <div style={{zIndex: 25}} onClick={() => callback(obj)} className='buttonStolen'>Товар закончился</div>}
            {obj.stolen && <div className="postStolen"><span className='textRotate'>Продан</span></div>}
        </div>
    )
}
export default PostItem