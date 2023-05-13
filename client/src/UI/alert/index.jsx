import RemindOutlineIcon from '@rsuite/icons/RemindOutline';
import classes from './style.module.css'

const Alert = ({children, ...props}) => {
    return(
        <div className={classes.alert} style={props.style}><RemindOutlineIcon/>{children}</div>
    )
}

export default Alert