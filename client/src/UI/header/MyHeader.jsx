import MyButton from "../button/MyButton"
import classes from "./MyHeader.module.css"

export default function MyHeader({children, ...props}){
    return(
        <header className={classes.header}>
            <div className={classes.logo}>&#128211;</div>
            <div className={classes.title}>BookStore</div>
            {children}
        </header>
    )
}