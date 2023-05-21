import classes from "./MyFooter.module.css"

const MyFooter = () => {
    return(
        <footer className={classes.footer}>
            <div>@Не известный</div>
            <div>v1.0.0</div>
            <div>{new Date().toLocaleDateString()}</div>
        </footer>
    )
}

export default MyFooter