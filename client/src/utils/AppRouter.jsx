import { Route, Routes,Navigate } from "react-router-dom"
import { adminRoutes, managerRoutes, privateRoutes, publicRoutes } from "../router/index"
import { useSelector } from "react-redux"
import Cart from "../pages/Cart"
import jwtDecode from "jwt-decode"

export default function AppRouter({isAuth}){
    const cart = useSelector(state => state.cart)

    const ChangeRoutes = () => {
        let arr;
        let token;
        if(isAuth) {
            token = jwtDecode(isAuth)
            switch(token.roleWeight){
                case 1:
                    arr = [...privateRoutes, ...publicRoutes]
                    break;
                case 2:
                    arr = [...managerRoutes, ...privateRoutes, ...publicRoutes]
                    break;
                case 3:
                    arr = [...adminRoutes ,...privateRoutes, ...publicRoutes]
                    break;
            }
            return arr
        }
        return arr = publicRoutes
    }

    const ChangeRedirect = () => {
        let token;
        if(isAuth) {
            token = jwtDecode(isAuth)
            switch(token.role){
                case 1:
                case 2:
                    return '/'
                case 3:
                    return '/admin/user'
            }
        }
    }

    return(
        <Routes>
            {ChangeRoutes().map(route =>
                <Route
                    element={<route.component/>}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            {cart.length != 0 && <Route
                element={<Cart/>}
                path={'/cart'}
                exact={true}
            />}
            <Route
                path="*"
                element={<Navigate to={ChangeRedirect()} replace />}
            />
        </Routes>
    )
}