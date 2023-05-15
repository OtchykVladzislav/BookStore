import Authors from "../pages/Authors"
import ErrorPage from "../pages/Error"
import Posts from "../pages/Posts"
import Home from "../pages/Home"
import Post from "../pages/Post"
import Account from "../pages/Account"
import PrintBook from "../pages/PrintBook"
import Genres from "../pages/Genres"
import Genre from "../pages/Genre"
import AdminTables from "../pages/Tables"
import TableOrder from "../pages/TableOrder"
import TableRequest from "../pages/TableRequest"
import TableBook from "../pages/TableBook"
import TableUser from "../pages/TableUser"

export const adminRoutes = [
    {path: '/admin/user', component: TableUser, exact: true},
    {path: '/admin/book', component: TableBook, exact: true},
    {path: '/admin/order', component: TableOrder, exact: true},
    {path: '/admin/request', component: TableRequest, exact: true},
    {path: '/admin', component: AdminTables, exact: true},
]

export const privateRoutes = [
    {path: '/account', component: Account, exact: true},
    {path: '/printbook', component: PrintBook, exact: true},
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