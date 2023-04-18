import React from 'react';
import MyInput from '../../UI/input/MyInput';
import MySelect from '../../UI/select/MySelect';

const PostFilter = ({filter, setFilter}) =>{
    return(
        <>
            <MyInput 
                type='text'
                value={filter.query} 
                func={text => setFilter({...filter, query: text})} 
                placeholder="Поиск по заголовку..."/>
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue = "Сортировка"
                options={[
                    {value: 'titleIncrease', name: 'По названию ↑'},
                    {value: 'titleDecrease', name: 'По названию ↓'},
                    {value: 'priceIncrease', name: 'По цене ↑'},
                    {value: 'priceDecrease', name: 'По цене ↓'}
                ]}/>
        </>
    )
}

export default PostFilter;