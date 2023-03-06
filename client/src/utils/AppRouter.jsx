import { Route, Routes,Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes/index"


export default function AppRouter({isAuth}){
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
                privateRoutes.map(route =>
                        <Route
                            element={<route.component/>}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                )
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