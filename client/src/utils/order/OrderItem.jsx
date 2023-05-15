import MyButton from "../../UI/button/MyButton"

const OrderItem = ({obj, callback}) => {
    return(
        <tr>
            <td>{obj.number_order}</td>
            <td>{obj.price} BYN</td>
            <td>{new Date(obj.date).toLocaleString()}</td>
            <td>{obj.status.status ? 'Оплачено': 'Не оплачено'}</td>
            <td style={{cursor: 'pointer'}} onClick={() => callback(obj, 'order')}>📄</td>
        </tr>
    )
}

export default OrderItem