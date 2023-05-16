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
                menuStyle={{ zIndex: 25}}
                style={{width: '20%'}}
                searchable={false}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                placeholder = "Сортировка"
                data={[
                    { value: 'stringIncrease', label: 'По названию ↑' },
                    { value: 'stringDecrease', label: 'По названию ↓' },
                    { value: 'numberIncrease', label: 'По цене ↑' },
                    { value: 'numberDecrease', label: 'По цене ↓' }
            ]}/>
        </>
    )
}

export default PostFilter;