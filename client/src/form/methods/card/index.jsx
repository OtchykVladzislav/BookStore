import { useState } from "react"
import React from 'react';
import Cards from 'react-credit-cards-2';
import classes from './style.module.css'
import MyButton from "../../../UI/button/MyButton";
import MyLoader from "../../../UI/loader/MyLoader";
import { InputNumber, MaskedInput } from "rsuite";
import { maskCVC, maskCreditCard, maskDate } from "../../../utils/valid";
import MyInput from "../../../UI/input/MyInput";


const CreditCard = ({callback}) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
    const [cardSuccess, setCardSuccess] = useState(false)
    
    const handleInputChange = (str, e) => {
        setState((prev) => ({ ...prev, [str]: e }));
    }
    
    const handleInputFocus = (str) => {
        setState((prev) => ({ ...prev, focus: str }));
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
                <MaskedInput
                    style={{width: '30%'}}
                    className={classes.number}
                    name="number"
                    placeholder="4242 4242 4242 4242"
                    keepCharPositions={true}
                    mask={maskCreditCard}
                    placeholderChar={'_'}
                    value={state.number}
                    onChange={e => handleInputChange('number', e)}
                    onFocus={() => handleInputFocus('number')}
                />
                <MyInput
                    style={{width: '30%'}}
                    className={classes.name}
                    name="name"
                    placeholder="Anonymous"
                    value={state.name}
                    onChange={e => handleInputChange('name', e)}
                    onFocus={() => handleInputFocus('name')}
                />
                <div className={classes.dateAndCvc}>
                    <MaskedInput
                        style={{width: '17%'}}
                        className={classes.expiry}
                        name="expiry"
                        placeholder="08/23"
                        keepCharPositions={true}
                        mask={maskDate}
                        placeholderChar={'_'}
                        value={state.expiry}
                        onChange={e => handleInputChange('expiry', e)}
                        onFocus={() => handleInputFocus('expiry')}
                    />
                    <MaskedInput
                        style={{width: '17%'}}
                        className={classes.cvc}
                        name="cvc"
                        placeholder="111"
                        keepCharPositions={true}
                        mask={maskCVC}
                        placeholderChar={'_'}
                        value={state.cvc}
                        onChange={e => handleInputChange('cvc', e)}
                        onFocus={() => handleInputFocus('cvc')}
                    />
                </div>
            </form>
            <MyButton onClick={() => send()}>Оплатить</MyButton></>}
        </div>
    );
}

export default CreditCard