const PostItem = ({...props}) => {
    return(
        <div className="item">
            <img className="infoPicture" src={`./${"book1"}.png`}/>
            <div className="infoBlock">
                <div className="title">{props.obj.name}</div>
                <div className="price">{props.obj.price} BYN</div>
                <div className="genre">{props.obj.genres.map(e => { return e.name }).join(',')}</div>
            </div>
        </div>
    )
}
export default PostItem