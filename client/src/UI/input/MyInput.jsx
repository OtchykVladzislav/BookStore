import classes from "./MyInput.module.css"

const MyInput = ({...props}) => {
    return(
        <div className={classes.textInputWrapper}>
            <input className={classes.textInput} onChange={e => props.func(e.target.value)} {...props}/>
            {props.value && <p className={classes.textCross} onClick={() => props.func('')}>&#10539;</p>}
        </div>
    )
}

export default MyInput