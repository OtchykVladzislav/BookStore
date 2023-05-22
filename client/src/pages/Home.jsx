import "../App.css"

const Home = () => {
    return(
        <article className="welcome">
            Добро пожаловать!!!
            <div>
                <img style={{width: '35%', height: '35%'}} src="прейскурант_первая.webp" />
                <img style={{width: '35%', height: '35%'}} src="прейскурант_вторая.webp" />
            </div>
        </article>
    )
}

export default Home