import PageIcon from '@rsuite/icons/Page';
import TrashIcon from '@rsuite/icons/Trash';
import RequestList from '../../API/RequestList';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useBase64 } from '../../hooks/useArrayBufferToBase64';
import ImageIcon from '@rsuite/icons/Image';

const remove = (id, str, arr, func) => {
    RequestList.delById(id, str);
    func([...arr.filter(e => e.id != id)])
}

export const Books = ({data, setData, callback}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Аватар</th>
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Жанры</th>
                    <th>Цена</th>
                    <th>Описание</th>
                    <th>Дата публикации</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.image? <img style={{width: '100px', height: '100px'}} src={useBase64(e.image.picByte.data, e.image.type)} /> : <PageIcon />}</td>
                        <td>{e.name}</td>
                        <td>{e.author}</td>
                        <td>{e.genres.map(e => e.name).join(', ')}</td>
                        <td>{e.price} BYN</td>
                        <td>{e.description}</td>
                        <td>{new Date(e.publish_date).toLocaleString()}</td>
                        <td>
                            <span onClick={() => callback(e, 'change')} style={{color: 'white'}} className='change_image'>
                                <ImageIcon style={{fontSize: '20px'}} />
                            </span>
                            <span onClick={() => remove(e.id, 'users', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Requests = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Книга</th>
                    <th>Место распечатки</th>
                    <th>Страницы</th>
                    <th>Тираж</th>
                    <th>Дата и время</th>
                    <th>Статус</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.book.name + ', ' + e.book.author}</td>
                        <td>{e.city.name + ', ' + e.city.adress} </td>
                        <td>{e.pages} стр.</td>
                        <td>{e.count_copies}</td>
                        <td>{new Date(e.createdAt).toLocaleString()}</td>
                        <td>{e.status.status ? 'Оплачено': 'Не оплачено'}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'users', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Orders = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Номер заказа</th>
                    <th>Книги</th>
                    <th>Город и улица</th>
                    <th>Оплата картой</th>
                    <th>Цена</th>
                    <th>Дата и время</th>
                    <th>Статус</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.number_order}</td>
                        <td>{e.books.map(e => e.name).join(', ')}</td>
                        <td>{e.city.name + ', ' + e.city.adress} </td>
                        <td>{e.is_card ? 'Да': 'Нет'}</td>
                        <td>{e.price} BYN</td>
                        <td>{new Date(e.date).toLocaleString()}</td>
                        <td>{e.status.status ? 'Оплачено': 'Не оплачено'}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'users', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Users = ({data, setData}) => {
    console.log(data)
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Аватар</th>
                    <th>Никнейм</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Вес на сайте</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.image? <img style={{width: '100px', height: '100px'}} src={useBase64(e.image.picByte.data, e.image.type)} /> : <AvatarIcon />}</td>
                        <td>{e.username}</td>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.role.weight}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'users', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Genre = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Картинка</th>
                    <th>Название</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.image? <img style={{width: '100px', height: '100px'}} src={useBase64(e.image.picByte.data, e.image.type)} /> : <PageIcon />}</td>
                        <td>{e.name}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'genres', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Roles = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Важность роли</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.description}</td>
                        <td>{e.weight}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'roles', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}


export const Cities = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>Адресс</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.adress}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'city', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Format = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i, arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'format', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Type = ({data, setData}) => {
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e,i,arr) =>
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>
                            <span onClick={() => remove(e.id, 'types', arr, setData)} style={{color: 'white'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}