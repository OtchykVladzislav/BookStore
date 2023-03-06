import { useState } from "react"
import Print from "../form/print"


const PrintBook = () => {
    const [posts, setPosts] = useState([{id: 1, title: 'Book1', genre: 'Horror', price: 25}, {id: 2, title: 'Book2', genre: 'Battle', price: 35}, {id: 3, title: 'Book3', genre: 'Genetic', price: 44}, {id: 4, title: 'Book1', genre: 'Horror', price: 25}, {id: 5, title: 'Book2', genre: 'Battle', price: 35}, {id: 6, title: 'Book3', genre: 'Genetic', price: 44}, {id: 7, title: 'Book1', genre: 'Horror', price: 25}, {id: 8, title: 'Book2', genre: 'Battle', price: 35}, {id: 9, title: 'Book3', genre: 'Genetic', price: 44}, {id: 10, title: 'Book3', genre: 'Genetic', price: 70}])
    const [success, setSuccess] = useState(false)

    const changeWindow = () => setSuccess(true)

    return(
        <article>
            {success?
                <div className="warning">Запрос на печать отправлен. Менеджер перезвонит.</div>
                :
                <Print array={posts} func={changeWindow}/>
            }
        </article>
    )
}

export default PrintBook