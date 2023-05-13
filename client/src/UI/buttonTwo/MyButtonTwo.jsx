import classes from './MyButtonTwo.module.css'

const MyButtonTwo = ({children, disabled, ...props}) => {
    return(
        <button className={disabled ? classes.disabled : classes.btn} disabled={disabled} {...props}>{children}</button>
    )
}

export default MyButtonTwo