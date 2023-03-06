import React from 'react';
import MyInput from '../../UI/input/MyInput';
import MySelect from '../../UI/select/MySelect';

const PostFilter = ({filter, setFilter}) =>{
    return(
        <>
            <MyInput 
                value={filter.query} 
                onChange = {e => setFilter({...filter, query: e.target.value})} 
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