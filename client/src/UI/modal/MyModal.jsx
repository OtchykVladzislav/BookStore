import classes from "./MyModal.module.css"

const MyModal = ({children, ...props}) => {
    return(
        <div className={props.visible? classes.background : classes.hide} onClick={() => props.setVisible(false)}>
            {children}
        </div>
    )
}

export default MyModal