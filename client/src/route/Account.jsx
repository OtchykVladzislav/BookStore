import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../UI/button/MyButton"


const Account = () => {
    const [ password, setPassword ] = useState({one:'', two: ''})
    const [ orders, setOrders] = useState([])
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const decodedToken = jwtDecode(token);

    const change = () => {
        if(password.one === password.two && password.one && password.two){
            console.log("sent")
            setPassword({one:'', two: ''})
        }
    }

    const logout = () => {
        localStorage.setItem('user', 0)
        dispatch({type: 'DELETE_TOKEN'})
    }

    return(
        <article className="account">
            <div className="accountTitle">Информация о пользователе</div>
            <div className="accountInfo">
                <div className="accountText">
                    <div>Никнейм: {decodedToken.username}</div>
                    <div>Имя: {decodedToken.firstName}</div>
                    <div>Фамилия: {decodedToken.lastName}</div>
                    <div>Номер телефона: {decodedToken.number}</div>
                    <div>Почта: {decodedToken.email}</div>
                </div>
                <div className="accountPicture">
                    <img src="icon.svg"/>
                </div>
            </div>
            <div className="accountPassword">
                <label>Новый пароль</label>
                <input value={password.one} onInput={e => setPassword({...password, one: e.target.value})} type="password" />
                <label>Повторить пароль</label>
                <input value={password.two} onInput={e => setPassword({...password, two: e.target.value})} type="password" />
                <MyButton onClick={change}>Поменять</MyButton>
            </div>
            <Link to='/'><MyButton onClick={logout}>Выйти</MyButton></Link>
            <div className="accountOrders">
                <span>История заказов</span>
                {!orders.length? "Нет заказов": comments.map((e,i) => console.log(e))}
            </div>
        </article>
    )
}

export default Account