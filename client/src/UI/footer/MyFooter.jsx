import classes from "./MyFooter.module.css"

const MyFooter = () => {
    return(
        <footer className={classes.footer}>
            <div>©Unknown</div>
            <div>v1.0.0</div>
            <div>{new Date().toLocaleDateString()}</div>
        </footer>
    )
}

export default MyFooter