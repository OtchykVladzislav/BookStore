import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link} from 'react-router-dom'
import './App.css'
import Registration from './form/registration/index'
import MyButton from './UI/button/MyButton'
import MyFooter from './UI/footer/MyFooter'
import MyHeader from './UI/header/MyHeader'
import MyModal from './UI/modal/MyModal'
import MyNav from './UI/nav/MyNav'
import AppRouter from './utils/AppRouter'
import 'rsuite/dist/rsuite.min.css';
import Login from './form/login/index'


function App() {
  const token = useSelector(state => state.token)
  const [modal, setModal] = useState(false)
  const [reg, setReg] = useState(false)
  return (
    <>
      <BrowserRouter>
        <MyHeader>
          {token?
            <div>
              {<Link to={'/cart'}>🛒</Link>}
              <Link to={'/account'}><div className="headerPicture"><img src="../icon.svg"/></div></Link>
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
