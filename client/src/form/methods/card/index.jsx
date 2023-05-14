import { useState } from "react"
import React from 'react';
import Cards from 'react-credit-cards-2';
import classes from './style.module.css'
import MyButton from "../../../UI/button/MyButton";
import MyLoader from "../../../UI/loader/MyLoader";


const CreditCard = ({callback}) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
    const [cardSuccess, setCardSuccess] = useState(false)
    
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }
    
    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const send = () => {
        if(state.number.length == 16 && state.cvc.length == 3 && state.expiry.length == 5 && state.name){
            callback()
            setCardSuccess(true)
        }
    }

    return (
        <div>{cardSuccess ?
            <>
                <MyLoader />
                <p>Пенаправление на платежную систему.....</p>
                <p>При оплате страницу можно закрыть</p>
            </>
            :
            <>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',marginTop: '10px'}}>
                <input
                    className={classes.number}
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    className={classes.name}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <div className={classes.dateAndCvc}>
                    <input
                        className={classes.expiry}
                        type="text"
                        name="expiry"
                        placeholder="Expiry"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        className={classes.cvc}
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
            </form>
            <MyButton onClick={() => send()}>Оплатить</MyButton></>}
        </div>
    );
}

export default CreditCard