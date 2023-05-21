import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import { InputGroup, SelectPicker,Pagination } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MyInput from '../UI/input/MyInput';
import { Users } from "../utils/table_fields";
import MyLoader from "../UI/loader/MyLoader";
import MyModal from "../UI/modal/MyModal";
import ChangeRole from "../form/change-role";


const TableUser = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(1)
    const [visible, setVisible] = useState(false)
    const [proccess, setProccess] = useState(false)
    const [params, setParams] = useState({})

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const [fetchData, isDataLoading, dataError] = useFetching(async (str) => {
        switch (str) {
            case 'list':
                setProccess(true)
                const list = await RequestList.getAll('users', limit, page);
                setData([...list.data[0]])
                setCount(list.data[1])
                setProccess(false)
                return;
            case 'filter':
                setProccess(true)
                const searchList = await RequestList.filterItems('users', filter.query, filter.sort, limit, page);
                console.log(searchList)
                setData([...searchList.data[0]])
                setCount(searchList.data[1])
                setProccess(false)
                return;
        }
    })

    const searchItem = () => {
        setPage(1)
        filter.query ? fetchData('filter') : fetchData('list')
    }

    const change = (obj) => {
        setParams({...obj})
        setVisible(true)
    }

    useEffect(() => {
        filter.sort ? fetchData('filter') : fetchData('list')
    }, [page, filter.sort])

    return (
        <article style={{ display: 'flex', position: 'relative',flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'center', background: '#191615', padding: '0 20px 40px 20px', }} className="post">
            <MyModal visible={visible} setVisible={setVisible}>
                <ChangeRole obj={params} data={data} setData={setData} visible={visible} setVisible={setVisible}/>
            </MyModal>
            <InputGroup inside style={{ margin: '10px', width: '100%' }}>
                <MyInput
                    type='text'
                    value={filter.query}
                    change={text => setFilter({ ...filter, query: text })}
                    placeholder="Поиск по заголовку..." />
                <InputGroup.Button onClick={searchItem}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
            <SelectPicker
                menuStyle={{ zIndex: 25}}
                style={{ width: '20%' }}
                searchable={false}
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                placeholder="Сортировка"
                data={[{ value: 'stringIncrease', label: 'По никнейму ↑' },
                { value: 'stringDecrease', label: 'По никнейму ↓' }]} 
            />
            {proccess ? <MyLoader/> : <>
                <div style={{ fontSize: 14 }}>
                    <table className="table" style={{ fontSize: 14 }}>
                        <Users callback={change} data={data} setData={setData}/>
                    </table>
                </div>
                <div style={{ width: '100%', color: 'white' }}>
                    <Pagination
                        style={{ fontSize: 15, position: 'absolute', bottom: 0, left: '10%', width: '80%', margin: '15px' }}
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={7}
                        size="xs"
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                        total={count}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </>
            }
        </article>
    )
}

export default TableUser
