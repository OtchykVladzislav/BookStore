import classes from './MyButtonTwo.module.css'

const MyButtonTwo = ({children, ...props}) => {
    return(
        <button className={classes.btn} {...props}>{children}</button>
    )
}

export default MyButtonTwo