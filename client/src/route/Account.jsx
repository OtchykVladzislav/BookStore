import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormComment from "../form/comments";
import MyButton from "../UI/button/MyButton"
import MyModal from "../UI/modal/MyModal";
import OrderItem from "../utils/Orders/OrderItem";


const Account = () => {
    const [ password, setPassword ] = useState({one:'', two: ''})
    const [ orders, setOrders] = useState([{book: {title: 'Book 1', price: 25}, createAt: '2021-02-01', id: 1}])
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const decodedToken = jwtDecode(token);
    const [visible, setVisible] = useState(false)
    let comment = {}

    const change = () => {
        if(password.one === password.two && password.one && password.two){
            console.log("sent")
            setPassword({one:'', two: ''})
        }
    }

    const logout = () => {
        localStorage.setItem('user', '')
        dispatch({type: 'DELETE_TOKEN'})
    }

    const createComment = (obj) => {
        comment = obj
        setVisible(true)
    }  

    return(
        <article className="account">
            <MyModal visible={visible} setVisible={setVisible}><FormComment visible={visible} setVisible={setVisible}/></MyModal>
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
            <div className="accountBonus">
                <span>Бонусная программа</span>
                <div>Количество бонусов: {0} баллов.</div>
                <span style={{fontSize:"10px"}}>С каждой покупки 3%. 1 балл = 1 рублю</span>
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
                {!orders.length? "Нет заказов": orders.map((e,i) => <OrderItem key={i} obj={e} func={createComment}/>)}
            </div>
        </article>
    )
}

export default Account