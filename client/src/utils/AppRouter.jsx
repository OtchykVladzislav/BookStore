import { Route, Routes,Navigate } from "react-router-dom"
import { adminRoutes, privateRoutes, publicRoutes } from "../router/index"
import { useSelector } from "react-redux"
import Cart from "../pages/Cart"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"


export default function AppRouter({isAuth}){
    const cart = useSelector(state => state.cart)
    const [decode, setDecode] = useState('')

    useEffect(() =>  setDecode(jwtDecode(isAuth)), [isAuth])

    return(
        <Routes>
            {publicRoutes.map(route =>
                <Route
                    element={<route.component/>}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            {isAuth &&
                <>
                    {privateRoutes.map(route =>
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
                    {decode.roleWeight == 3 && <> {adminRoutes.map(route =>
                            <Route
                                element={<route.component/>}
                                path={route.path}
                                exact={route.exact}
                                key={route.path}
                            />
                    )}</>}
                </>

            }
            <Route
                path="*"
                element={<Navigate to="/error" replace />}
            />
        </Routes>
    )
}