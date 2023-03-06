const PostItem = ({...props}) => {
    return(
        <div className="item">
            <img className="infoPicture" src={`./${"book1"}.png`}/>
            <div className="infoBlock">
                <div className="title">{props.obj.title}</div>
                <div className="price">{props.obj.price} BYN</div>
                <div className="genre">{props.obj.genre}</div>
            </div>
        </div>
    )
}
export default PostItem