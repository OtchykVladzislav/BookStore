import { Link } from "react-router-dom"
import MyButton from "../button/MyButton"
import classes from "./MyNav.module.css"

const MyNav = () => {
    return(
        <nav className={classes.nav}>
            <Link to={'/'}><MyButton>Главная</MyButton></Link>
            <Link to={'/posts'}><MyButton>Товары</MyButton></Link>
            <Link to={'/authors'}><MyButton>Авторы</MyButton></Link>
        </nav>
    )
}

export default MyNav