import MyButton from "../../UI/button/MyButton"

const OrderItem = ({obj}) => {
    return(
        <tr>
            <td>{obj.number_order}</td>
            <td>{obj.price} BYN</td>
            <td>{new Date(obj.date).toLocaleString()}</td>
            <td>{obj.status.status ? 'Оплачено': 'Не оплачено'}</td>
        </tr>
    )
}

export default OrderItem