import MyButton from "../../UI/button/MyButton"

const OrderItem = ({obj, func}) => {
    return(
        <div className="orderItem">
            <div className="description">{obj.book.title}</div>
            <div>{obj.book.price} р.</div>
            <div>{new Date(obj.createAt).toLocaleDateString()}</div>
            <MyButton onClick={() => func(obj)}>Оставить отзыв</MyButton>
        </div>
    )
}

export default OrderItem