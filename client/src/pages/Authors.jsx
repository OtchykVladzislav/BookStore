import "../App.css"
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

const Authors = () => {
    return(
        <article>
            <div className={"card-client"}>
                <div className="user-picture">
                    <AvatarIcon style={{fontSize: 80 }} />
                </div>
                <p className="name-client"> Unknown
                    <span>Developer
                    </span>
                </p>
                <div className="social-media">
                    <a href="#">
                        <img src="instagram.svg"/>
                        <span className="tooltip-social">Instagram</span>
                    </a>
                    <a href="#">
                        <img src="facebook.svg"/>
                        <span className="tooltip-social">Facebook</span>
                    </a>
                    <a href="#">
                        <img src="linkedin.svg"/>
                        <span className="tooltip-social">LinkedIn</span>
                    </a>
                </div>
            </div>
        </article>
    )
}

export default Authors