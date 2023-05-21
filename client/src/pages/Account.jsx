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
import RequestItem from "../utils/request";
import ChangeImage from "../form/change-image";
import InfoRequest from "../form/info-request";
import InfoOrder from "../form/info-order";

const Account = () => {
    const [ user, setUser ] = useState({})
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const [typeModal, setTypeModal] = useState('new_password')
    const [obj, setObj] = useState('')

    const [fetchProfile, isProfileLoading, profileError] = useFetching(async () => {
        const obj = await RequestList.profile();
        setUser({...obj.data})
    })

    const [fetchDel, isDelLoading, delError] = useFetching(async (obj) => {
        const list = user.requests.filter(e => e.id != obj.id)
        await RequestList.delById(obj.id, 'requests');
        setUser({...user, requests: list})
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
        navigate('/posts')
        RequestList.logout()
        localStorage.setItem('user', '')
        dispatch({type: 'DELETE_TOKEN'})
        dispatch({type: 'NULL_CART'})
    }

    const setInfo = (obj,str) => {
        setObj(obj.id)
        setTypeModal(str)
        setVisible(true)
    }

    const chooseModal = () => {
        switch (typeModal) {
            case 'new_password':
                return <NewPassword callback={change} visible={visible} setVisible={setVisible}/>
            case 'order':
                return <InfoOrder id={obj}/>
            case 'request':
                return <InfoRequest id={obj}/>
        }
    }

    return(
        <article className="account">
            <MyModal visible={visible} setVisible={setVisible}>
                {chooseModal()}
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
                        <ChangeImage image={user.image} callback={() => logout()}/>
                    </div>
                    <div className="accountBonus">
                        <span>Бонусная программа</span>
                        <div>Количество бонусов: {user.bonus} баллов.</div>
                        <span style={{fontSize:"10px"}}>С каждой покупки 3%. 1 балл = 1 рублю</span>
                    </div>
                    <MyButton onClick={() => {setTypeModal('new_password'); setVisible(true)}}>Сменить пароль</MyButton>
                    <Link to='/'><MyButton onClick={logout}>Выйти</MyButton></Link>
                    <div className="tables">
                        <div className="accountOrders">
                            <span>История запросов</span>
                            {!user.requests.length? 
                                "Нет запросов"
                                :
                                <table className="table" style={{fontSize: '15px'}}>
                                    <thead>
                                        <tr>
                                            <th>Тираж</th>
                                            <th>Кол-во страниц</th>
                                            <th>Дата и время</th>
                                            <th>Статус</th>
                                            <th>Сводка</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {user.requests.map((e,i) =>
                                        <RequestItem key={i} obj={e} remove={fetchDel} callback={setInfo}/>
                                    )}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <div className="accountOrders">
                            <span>История заказов</span>
                            {!user.orders.length? 
                                "Нет заказов"
                                :
                                <table className="table" style={{fontSize: '15px'}}>
                                    <thead>
                                        <tr>
                                            <th>Название слота</th>
                                            <th>Сумма</th>
                                            <th>Дата и время</th>
                                            <th>Статус</th>
                                            <th>Сводка</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {user.orders.map((e,i) =>
                                        <OrderItem key={i} obj={e} callback={setInfo}/>
                                    )}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </>
            }
        </article>
    )
}

export default Account