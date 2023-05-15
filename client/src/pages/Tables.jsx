import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import NavAdmin from "../UI/nav_admin";
import { InputGroup, SelectPicker, Button, Pagination } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MyInput from '../UI/input/MyInput';
import { Books, Cities, Format, Genre, Orders, Requests, Roles, Type, Users } from "../utils/table_fields";
import MyLoader from "../UI/loader/MyLoader";
import MyModal from "../UI/modal/MyModal";
import PlusIcon from '@rsuite/icons/Plus';
import CreateType from "../form/create-type";
import CreateFormat from "../form/create-format";
import CreateGenre from "../form/create-genres";
import CreateRole from "../form/create-roles";
import CreateCity from "../form/create-city"


const AdminTables = () => {
    const [active, setActive] = useState('genres');
    const [data, setData] = useState([])
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [visible, setVisible] = useState(false)
    const [proccess, setProccess] = useState(false)

    const [fetchData, isDataLoading, dataError] = useFetching(async (str, item) => {
        switch (str) {
            case 'list':
                setProccess(true)
                const list = await RequestList.getAll(item, limit, page);
                setData([...list.data])
                setProccess(false)
                return;
            case 'filter':
                setProccess(true)
                const searchList = await RequestList.filterItems(item, query, limit, page);
                setData([...searchList.data])
                setProccess(false)
                return;
        }
    })

    const changeTable = () => {
        switch (active) {
            case 'types':
                return <Type data={data} setData={setData}/>
            case 'format':
                return <Format data={data} setData={setData}/>
            case 'city':
                return <Cities data={data} setData={setData}/>
            case 'genres':
                return <Genre data={data} setData={setData}/>
            case 'roles':
                return <Roles data={data} setData={setData}/>
        }
    }

    const chooseModal = () => {
        switch (active) {
            case 'types':
                return <CreateType data={data} setData={setData} visible={visible} setVisible={setVisible}/>
            case 'format':
                return <CreateFormat data={data} setData={setData} visible={visible} setVisible={setVisible}/>
            case 'city':
                return <CreateCity data={data} setData={setData} visible={visible} setVisible={setVisible}/>
            case 'genres':
                return <CreateGenre data={data} setData={setData} visible={visible} setVisible={setVisible}/>
            case 'roles':
                return <CreateRole data={data} setData={setData} visible={visible} setVisible={setVisible}/>
        }
    }

    const searchItem = () => {
        fetchData('filter', active)
    }


    useEffect(() => {
        query ? fetchData('filter', active) : fetchData('list', active)
    }, [page])

    useEffect(() => {
        setData([])
        fetchData('list', active)
        setQuery('')
        setPage(1)
    }, [active])


    return (
        <article style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'center', background: '#191615', padding: '0 20px 40px 20px', }} className="post">
            <MyModal visible={visible} setVisible={setVisible}>
                {chooseModal()}
            </MyModal>
            <NavAdmin appearance="tabs" reversed active={active} onSelect={setActive} />
            <InputGroup inside style={{ margin: '10px', width: '100%' }}>
                <MyInput
                    type='text'
                    value={query}
                    change={text => setQuery(text)}
                    placeholder="Поиск по заголовку..." />
                <InputGroup.Button onClick={searchItem}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
            {proccess ? <MyLoader/> : <>
                <PlusIcon className="edit" style={{fontSize: '40px', margin: '10px'}} onClick={() => setVisible(true)}/>
                <div style={{ fontSize: 14 }}>
                    <table className="table" style={{ fontSize: 14 }}>
                        {changeTable()}
                    </table>
                </div>
            </> 
            }
        </article>
    )
}

export default AdminTables
