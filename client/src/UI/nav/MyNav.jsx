import { Link } from "react-router-dom"
import MyButton from "../button/MyButton"
import classes from "./MyNav.module.css"

const MyNav = ({isAuth}) => {
    return(
        <nav className={classes.nav}>
            <Link to={'/'}><MyButton>Главная</MyButton></Link>
            <Link to={'/posts'}><MyButton>Товары</MyButton></Link>
            {isAuth && <Link to={'/printbook'}><MyButton>Печать</MyButton></Link>}
            <Link to={'/authors'}><MyButton>Авторы</MyButton></Link>
        </nav>
    )
}

export default MyNav