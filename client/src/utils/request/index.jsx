const RequestItem = ({obj, remove, callback}) => {
    return(
        <tr>
            <td>{obj.count_copies}</td>
            <td>{obj.pages} стр.</td>
            <td>{new Date(obj.createdAt).toLocaleString()}</td>
            <td>{obj.status.status ? 'Завершено': 'Не завершено'}</td>
            <td style={{cursor: 'pointer'}} onClick={() => callback(obj, 'request')}>📄</td>
            <td><span className="cross" onClick={() => remove(obj)}>Удалить</span></td>
        </tr>
    )
}

export default RequestItem