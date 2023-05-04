import Authors from "../pages/Authors"
import ErrorPage from "../pages/Error"
import Posts from "../pages/Posts"
import Home from "../pages/Home"
import Post from "../pages/Post"
import Account from "../pages/Account"
import PrintBook from "../pages/PrintBook"
import Genres from "../pages/Genres"
import Genre from "../pages/Genre"

export const privateRoutes = [
    {path: '/account', component: Account, exact: true},
    {path: '/printbook', component: PrintBook, exact: true}
]

export const publicRoutes = [
    {path: '/genres/:id', component: Genre, exact: true},
    {path: '/genres', component: Genres, exact: true},
    {path: '/error', component: ErrorPage, exact: true},
    {path: '/authors', component: Authors, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: Post, exact: true},
    {path: '/', component: Home, exact: true}
]