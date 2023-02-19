import Authors from "../route/Authors"
import ErrorPage from "../route/Error"
import Posts from "../route/Posts"
import Home from "../route/Home"
import Post from "../route/Post"
import Account from "../route/Account"

export const privateRoutes = [
    {path: '/account', component: Account, exact: true}
]

export const publicRoutes = [
    {path: '/error', component: ErrorPage, exact: true},
    {path: '/authors', component: Authors, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: Post, exact: true},
    {path: '/', component: Home, exact: true}
]