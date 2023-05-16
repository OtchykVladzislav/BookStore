import PageIcon from '@rsuite/icons/Page';
import TrashIcon from '@rsuite/icons/Trash';
import RequestList from '../../API/RequestList';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useBase64 } from '../../hooks/useArrayBufferToBase64';
import ImageIcon from '@rsuite/icons/Image';
import CheckIcon from '@rsuite/icons/Check';
import { useState } from 'react';
import ChangeImageBook from '../../form/change-image-book';
import MyModal from '../../UI/modal/MyModal';
import UserChangeIcon from '@rsuite/icons/UserChange';

const check = (e, i, str, arr, func) => {
    const list = arr
    if(str == 'status_orders'){
        RequestList.putById(e.status.id, str, {price: e.price});
        list[i].status.status = true;
        func([...list])
        return;
    }
    RequestList.putById(e.status.id, str, {});
    list[i].status.status = true;
    func([...list])
}


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
                            <span onClick={() => callback({...e, index: i}, 'change')} style={{color: 'white', display: 'block'}} className='change_image'>
                                <ImageIcon style={{fontSize: '20px'}} />
                            </span>
                            <span onClick={() => remove(e.id, 'books', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                        <td style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                            {!e.status.status && <span onClick={() => check(e, i, 'status_requests', arr, setData)} style={{color: 'white', display: 'block', marginRight: '10px'}} className='edit'>
                                <CheckIcon style={{fontSize: '20px'}} />
                            </span>}
                            <span onClick={() => remove(e.id, 'requests', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                        <td>{e.status.status ? 'Завершено': 'Не завершено'}</td>
                        <td>
                            {!e.status.status && <span onClick={() => check(e, i, 'status_orders', arr, setData)} style={{color: 'white', display: 'block', marginRight: '10px'}} className='edit'>
                                <CheckIcon style={{fontSize: '20px'}} />
                            </span>}
                            <span onClick={() => remove(e.id, 'odrers', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export const Users = ({data, setData, callback}) => {
    const nameRole = (num) => {
        switch (num) {
            case 1:
                return 'Обычный доступ'
            case 2:
                return 'Средний доступ'
            case 3:
                return 'Высокий доступ'
        }
    }
    
    return(
        <>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Аватар</th>
                    <th>Никнейм</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Роль</th>
                    <th>Доступ на сайте</th>
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
                        <td>{e.role.name}</td>
                        <td>{nameRole(e.role.weight)}</td>
                        <td>
                            <span onClick={() => callback({...e, index: i})} style={{color: 'white', display: 'block'}} className='edit'>
                                <UserChangeIcon style={{fontSize: '20px'}} />
                            </span>
                            <span onClick={() => remove(e.id, 'users', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
    const [visible, setVisible] = useState(false)
    const [params, setParams] = useState({})

    return(
        <>
            <MyModal visible={visible} setVisible={setVisible}>
                <ChangeImageBook obj={params} data={data} str={'image_genre'} setData={setData} visible={visible} setVisible={setVisible}/>
            </MyModal>
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
                            <span onClick={() => {setParams({...e, index: i}); setVisible(true)}} style={{color: 'white', display: 'block', marginRight: '10px'}} className='change_image'>
                                <ImageIcon style={{fontSize: '20px'}} />
                            </span>
                            <span onClick={() => remove(e.id, 'genres', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                            <span onClick={() => remove(e.id, 'roles', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                            <span onClick={() => remove(e.id, 'city', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                            <span onClick={() => remove(e.id, 'format', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
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
                            <span onClick={() => remove(e.id, 'types', arr, setData)} style={{color: 'white', display: 'block'}} className='cross'>
                                <TrashIcon style={{fontSize: '20px'}} />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    )
}