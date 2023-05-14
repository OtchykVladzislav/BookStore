import { Link } from "react-router-dom"
import MyButton from "../button/MyButton"
import classes from "./MyHeader.module.css"

export default function MyHeader({children, ...props}){
    return(
        <header className={classes.header}>
            <div className={classes.logo}>&#128211;</div>
            <Link style={{textDecoration: 'none'}} to={'/'}><div className={classes.title}>BookStore</div></Link>
            {children}
        </header>
    )
}