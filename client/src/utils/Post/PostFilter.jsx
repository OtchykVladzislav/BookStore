import React from 'react';
import MyInput from '../../UI/input/MyInput';
import { InputGroup, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const PostFilter = ({callback, filter, setFilter}) =>{
    return(
        <>
            <InputGroup inside style={{margin: '10px', width: '60%'}}>
                <MyInput 
                    type='text'
                    value={filter.query} 
                    change={text => setFilter({...filter, query: text})} 
                    placeholder="Поиск по заголовку..."/>
                <InputGroup.Button onClick={callback}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
            <SelectPicker 
                style={{width: '20%'}}
                searchable={false}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                placeholder = "Сортировка"
                data={[
                    {value: 'titleIncrease', label: 'По названию ↑'},
                    {value: 'titleDecrease', label: 'По названию ↓'},
                    {value: 'priceIncrease', label: 'По цене ↑'},
                    {value: 'priceDecrease', label: 'По цене ↓'}
                ]}/>
        </>
    )
}

export default PostFilter;