import classes from "./MyLoader.module.css"

const MyLoader = () => {
    return(
        <div className={classes.wrapper}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.shadow}></div>
            <div className={classes.shadow}></div>
            <div className={classes.shadow}></div>
        </div>
    )
}

export default MyLoader