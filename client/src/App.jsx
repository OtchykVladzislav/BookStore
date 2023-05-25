import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Link, useNavigate} from 'react-router-dom'
import './App.css'
import Registration from './form/registration/index'
import MyButton from './UI/button/MyButton'
import MyFooter from './UI/footer/MyFooter'
import MyHeader from './UI/header/MyHeader'
import MyModal from './UI/modal/MyModal'
import MyNav from './UI/nav/MyNav'
import AppRouter from './utils/AppRouter'
import 'rsuite/dist/rsuite.min.css';
import 'react-phone-number-input/style.css'
import Login from './form/login/index'
import IconCart from './UI/icon_cart'
import jwtDecode from 'jwt-decode'
import { Avatar, Nav } from 'rsuite'
import { useFetching } from './hooks/useFetching'
import RequestList from './API/RequestList'
import { useBase64 } from './hooks/useArrayBufferToBase64'
import GearIcon from '@rsuite/icons/Gear';

function App() {
  const token = useSelector(state => state.token.token)
  const [decode, setDecode] = useState('')
  const cart = useSelector(state => state.cart)
  const [modal, setModal] = useState(false)
  const [reg, setReg] = useState(false)
  const [image, setImage] = useState('')

  const [fetchProfile, isProfileLoading, profileError] = useFetching(async () => {
    const obj = await RequestList.profile();
    if(obj.data.image) return setImage(useBase64(obj.data.image.picByte.data, obj.data.image.type))
    return setImage('')
  })

  useEffect(() => {
    if(token) {
      setDecode(jwtDecode(token))
      fetchProfile()
    }
  }, [token])



  return (
    <>
      <BrowserRouter>
        <MyHeader>
          {token?
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '200px'}}>
              {decode.roleWeight == 3 &&
                <Nav className='gearButton'><Nav.Menu icon={<GearIcon />}>
                    <Link to='/admin/user'><Nav.Item>Пользователи</Nav.Item></Link>
                </Nav.Menu></Nav>
              }
              {decode.roleWeight == 2 &&
                <Nav className='gearButton'><Nav.Menu icon={<GearIcon />}>
                    <Link to='/admin/order'><Nav.Item>Заказы</Nav.Item></Link>
                    <Link to='/admin/request'><Nav.Item>Запросы</Nav.Item></Link>
                    <Link to='/admin/book'><Nav.Item>Книги</Nav.Item></Link>
                    <Link to='/admin'><Nav.Item>Все остальные таблицы</Nav.Item></Link>
                </Nav.Menu></Nav>
              }
              {!isProfileLoading && <Link to={'/account'}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '5%', marginRight: '5%', color: 'white', fontSize: 20}}>
                  <span style={{marginRight: '10px'}}>{decode.username}</span>
                  <Avatar 
                    style={{width: '70px'}}
                    size="lg"
                    circle
                    src={image ? image : 'icon.svg'}
                    alt={`@${decode.username}`}
                  />
                </div>
              </Link>}
              {cart.length != 0 && <IconCart />}
            </div>
            :
            <div>
              <MyButton onClick={() => {setModal(true); setReg(false)}}>Войти</MyButton>
              <MyButton onClick={() => {setModal(true); setReg(true)}}>Регистрация</MyButton>
            </div>
          }
        </MyHeader>
        <MyNav isAuth={token}/>
        <MyModal visible={modal} setVisible={setModal}>
          {!reg?
            <Login visible={modal} setVisible={setModal}/>
            :
            <Registration visible={modal} setVisible={setModal}/>
          }
        </MyModal>
        <AppRouter isAuth={token}/>
        <MyFooter/>
      </BrowserRouter>
    </>
  )
}

export default App
