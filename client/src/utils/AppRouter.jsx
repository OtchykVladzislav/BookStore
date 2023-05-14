import { Route, Routes,Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../router/index"
import { useSelector } from "react-redux"
import Cart from "../pages/Cart"


export default function AppRouter({isAuth}){
    const cart = useSelector(state => state.cart)
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
                </>
            }
            <Route
                path="*"
                element={<Navigate to="/error" replace />}
            />
        </Routes>
    )
}


/*{userPos == 'admin' 
                        &&
                        <Route
                            element={<Client/>}
                            path={'/client'}
                            exact={true}
                            key={'/client'}
                        />

                    }*/