import { useState } from "react"
import React from 'react';
import CreditCardInput from 'react-credit-card-input';

const CreditCard = () => {
    const [payment, setPayment] = useState({cvc: '', expiry: '', cardNumber: ''})
    
    const handleCardNumberChange = (e) => {
        setPayment({...payment, cardNumber: e})
    }

    const handleCardExpiryChange = () => {
        setPayment({...payment, cardNumber: e})
    }

    const handleCardCVCChange = () => {
        setPayment({...payment, cardNumber: e})
    }

    return (
        <CreditCardInput
            cardNumberInputProps={{ value: payment.cardNumber, onChange: handleCardNumberChange }}
            cardExpiryInputProps={{ value: payment.expiry, onChange: handleCardExpiryChange }}
            cardCVCInputProps={{ value: payment.cvc, onChange: handleCardCVCChange }}
            fieldClassName="input"
        />
    );
}

export default CreditCard