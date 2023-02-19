import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";

const Account = () => { 
    const [ orders, setOrders] = useState([])
    const token = useSelector(state => state.token)
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
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
            <div className="accountOrders">
                <span>История заказов</span>
                {!orders.length? "Нет заказов": comments.map((e,i) => console.log(e))}
            </div>
        </article>
    )
}

export default Account