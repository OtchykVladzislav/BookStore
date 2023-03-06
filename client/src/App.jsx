import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link} from 'react-router-dom'
import './App.css'
import Login from './form/login'
import Registration from './form/registration'
import MyButton from './UI/button/MyButton'
import MyFooter from './UI/footer/MyFooter'
import MyHeader from './UI/header/MyHeader'
import MyModal from './UI/modal/MyModal'
import MyNav from './UI/nav/MyNav'
import AppRouter from './utils/AppRouter'


function App() {
  const token = useSelector(state => state.token)
  const [modal, setModal] = useState(false)
  const [reg, setReg] = useState(false)
  return (
    <>
      <BrowserRouter>
        <MyHeader>
          {token?
            <Link to={'/account'}><div className="headerPicture">
              <img src="../icon.svg"/>
            </div></Link>
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
