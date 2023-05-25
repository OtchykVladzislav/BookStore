import classes from './style.module.css'

const BonusInfo = ({visible, setVisble}) => {
    return(
        <div className={classes.account_password} onClick={e => e.stopPropagation()}>
            <p>
                /*text info */
            </p>
        </div>
    )
}

export default BonusInfo