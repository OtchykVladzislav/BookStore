import { Button, ButtonGroup, Radio, RadioGroup, SelectPicker, Steps } from "rsuite"
import { useFetching } from "../hooks/useFetching";
import RequestList from "../API/RequestList";
import { useEffect, useState } from "react";
import MyInput from "../UI/input/MyInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyButtonTwo from "../UI/buttonTwo/MyButtonTwo";
import MyButton from "../UI/button/MyButton";
import CreditCard from "../form/methods/card";

const Cart = () => {
    const [bonus, setBonus] = useState(0)
    const [form, setForm] = useState({city: ''})
    const [cities, setCities] = useState([])
    const [books, setBooks] = useState([])
    const [user, setUser] = useState({})
    const [isCard, setIsCard] = useState(true)
    const cart = new Set(useSelector(state => state.cart))
    const [allPrice, setAllPrice] = useState(0)
    const [step, setStep] = useState(0);
    const navigate = useNavigate()

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };


    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const minusBook = (i) => {
        const arr = books
        arr[i].count-=1
        if(arr[i].count == 0){
            arr.splice(i, 1)
        }
        if(arr.length == 0) navigate('/posts')
        setBooks([...arr])
    }

    const plusBook = (i) => {
        const arr = books
        arr[i].count+=1
        setBooks([...arr])
    }

    const [fetchBooks, isBooksLoading, booksError] = useFetching(async () => {
        const list = await RequestList.addElem('books/array', Array.from(cart));
        setBooks([...list.data.map(e => {return {id: e.id, name: e.name, price: e.price, count: 1}})])
    })

    const [fetchProfile, isProfileLoading, profileError] = useFetching(async () => {
        const obj = await RequestList.profile();
        setUser({...obj.data})
    })

    const [fetchCity, isCityLoading, cityError] = useFetching(async () => {
        const list = await RequestList.getAll('city');
        setCities([...list.data.map(item => ({ label: `${item.name}, ${item.adress}`, value: item.id }))])
    })

    const calculatePrice = () => {
        let sum = 0;
        books.map(e => sum += (e.price * e.count));
        setAllPrice(sum - bonus)
    }

    useEffect(() => {
        fetchBooks()
        fetchProfile()
        fetchCity()
    }, []) 

    useEffect(() => calculatePrice(), [bonus, books])

console.log(isCard)

    return(
        <article>
            <div className="stepsCart">
                <Steps current={step}>
                    <Steps.Item title="Выбор книг"/>
                    <Steps.Item title="Бонусы"/>
                    <Steps.Item title="Адресс магазина"/>
                    <Steps.Item title="Способ оплаты"/>
                </Steps>
            </div>
            {step == 0 && <div className="stepsCart">
                {books.map((e, i)=> {return <div className="bookItem">
                    <div>
                        <p>{e.name}</p>
                        <p>{e.price} BYN</p>
                    </div>
                    <ButtonGroup style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button onClick={() => minusBook(i)} disabled={e.count === 0}>-</Button>
                        <div style={{width: '70%', textAlign: 'center'}}>{e.count}</div>
                        <Button onClick={() => plusBook(i)}>+</Button>
                    </ButtonGroup>
                </div>})}
            </div>}
            {step == 1 && <div className="stepsCart">
                {user.bonus? <MyInput type='number' placeholder={'Введите сколько хотите потратить'} value={bonus} change={number => setBonus(number)} />: <p style={{fontSize: '18px'}}>У вас нет бонусов</p>}
            </div>}
            {step == 2 && <div className="stepsCart">
                <p style={{fontSize: '18px'}}>Выберите магазин, чтобы забрать книги.</p>
                <SelectPicker
                    style={{ width: '100%' }} 
                    value={form.city}
                    onChange={selectedSort => setForm({...form, city: selectedSort})}
                    placeholder = "Город"
                    data={cities}/>
            </div>}
            {step == 3 && <div className="stepsCart">
                <RadioGroup name="radioList" inline appearance="picker" value={isCard} onChange={e => setIsCard(JSON.parse(e))}>
                    <Radio value={true}>Оплата картой</Radio>
                    <Radio value={false}>Оплата наличными</Radio>
                </RadioGroup>
                {isCard && <CreditCard />}
                <h3>Итого: <span>{allPrice} BYN</span></h3><><MyButton>Сделать заказ</MyButton></>
            </div>}
            {books.length != 0 && <ButtonGroup>
                <Button onClick={onPrevious} disabled={step === 0}>
                Предыдущая
                </Button>
                <Button onClick={onNext} disabled={step === 3}>
                Следующая
                </Button>
            </ButtonGroup>}
        </article>
    )
}

export default Cart