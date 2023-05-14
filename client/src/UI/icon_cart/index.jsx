import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import classes from './style.module.css'

const IconCart = () => {
    const cart = new Set(useSelector(state => state.cart))
    return(
        <Link className={classes.link} to={'/cart'}>
            <span className={classes.icon}>🛒</span>
            <span className={classes.count}>{cart.size}</span>
        </Link>
    )
}

export default IconCart