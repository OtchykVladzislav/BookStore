import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NewPassword from "../form/new_password";
import MyButton from "../UI/button/MyButton"
import MyModal from "../UI/modal/MyModal";
import OrderItem from "../utils/order/OrderItem";
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import Loader from "../UI/loader/MyLoader"

const Account = () => {
    const [ user, setUser ] = useState({})
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    const [fetchProfile, isProfileLoading, profileError] = useFetching(async () => {
        const obj = await RequestList.profile();
        setUser({...obj.data})
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const change = (password) => {
        if(password.one === password.two && password.one && password.two){
            RequestList.newPassword({password: password.one})
            navigate('/')
            localStorage.setItem('user', '')
            dispatch({type: 'DELETE_TOKEN'})
        }
    }

    const logout = () => {
        RequestList.logout()
        localStorage.setItem('user', '')
        dispatch({type: 'DELETE_TOKEN'})
    }

    const createComment = (obj) => {
        navigate('/posts')
    }  

    return(
        <article className="account">
            <MyModal visible={visible} setVisible={setVisible}>
                <NewPassword callback={change} visible={visible} setVisible={setVisible}/>
            </MyModal>
            {isProfileLoading?
                <Loader />
                :
                <>
                    <div className="accountTitle">Информация о пользователе</div>
                    <div className="accountInfo">
                        <div className="accountText">
                            <div>Никнейм: {user.username}</div>
                            <div>Имя: {user.firstName}</div>
                            <div>Фамилия: {user.lastName}</div>
                            <div>Номер телефона: {user.phone_number}</div>
                            <div>Почта: {user.email}</div>
                        </div>
                        <div className="accountPicture">
                            <img src="icon.svg"/>
                        </div>
                    </div>
                    <div className="accountBonus">
                        <span>Бонусная программа</span>
                        <div>Количество бонусов: {user.bonus} баллов.</div>
                        <span style={{fontSize:"10px"}}>С каждой покупки 3%. 1 балл = 1 рублю</span>
                    </div>
                    <MyButton onClick={() => setVisible(true)}>Сменить пароль</MyButton>
                    <Link to='/'><MyButton onClick={logout}>Выйти</MyButton></Link>
                    <div className="accountOrders">
                        <span>История заказов</span>
                        {!user.orders.length? "Нет заказов": user.orders.map((e,i) => <OrderItem key={i} obj={e} func={createComment}/>)}
                    </div>
                </>
            }
        </article>
    )
}

export default Account