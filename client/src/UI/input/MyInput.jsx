import classes from "./MyInput.module.css"

const MyInput = ({...props}) => {
    return(
        <div className={classes.textInputWrapper}>
            <input type="text" className={classes.textInput} {...props}/>
        </div>
    )
}

export default MyInput