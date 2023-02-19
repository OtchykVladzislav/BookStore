import { useSelector } from 'react-redux'
import { BrowserRouter, Link} from 'react-router-dom'
import './App.css'
import MyFooter from './UI/footer/MyFooter'
import MyHeader from './UI/header/MyHeader'
import MyNav from './UI/nav/MyNav'
import AppRouter from './utils/AppRouter'


function App() {
  const token = useSelector(state => state.token)
  return (
    <>
      <BrowserRouter>
        <MyHeader>
          {token?
            <Link to={'/account'}><div className="headerPicture">
              <img src="icon.svg"/>
            </div></Link>
            :
            <div>
              <MyButton >Войти</MyButton>
              <MyButton>Регистрация</MyButton>
            </div>
          }
        </MyHeader>
        <MyNav/>
        <AppRouter isAuth={false}/>
        <MyFooter/>
      </BrowserRouter>
    </>
  )
}

export default App
