const Order = () => {
    return(
        <div className="modalPayment" onClick={e => e.stopPropagation()}>
            <div className="payment--options">
                <button name="paypal" type="button">
                    <img src="../paypal.svg"/>
                </button>
                <button name="apple-pay" type="button">
                    <img src="../apple_pay.svg"/>
                </button>
                <button name="google-pay" type="button">
                    <img src="../google_pay.svg"/>
                </button>
            </div>
            <div className="separator">
                <hr className="line"/>
                <p>or pay using credit card</p>
                <hr className="line"/>
            </div>
            <div className="credit-card-info--form">
                <div className="input_container">
                <label htmlFor="password_field" className="input_label">Card holder full name</label>
                <input className="input_field" type="password" name="input-name" title="Inpit title" placeholder="Enter your full name"/>
                </div>
                <div className="input_container">
                <label htmlFor="password_field" className="input_label">Card Number</label>
                <input className="input_field" type="password" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000"/>
                </div>
                <div className="input_container">
                <label htmlFor="password_field" className="input_label">Expiry Date / CVV</label>
                <div className="split">
                <input className="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23"/>
                <input className="input_field" type="number" name="cvv" title="CVV" placeholder="CVV"/>
                </div>
                </div>
            </div>
            <button className="purchase--btn">Checkout</button>
            <span className="little">После оплаты начисляться баллы в размере 3% от суммы.</span>
        </div>
    )
}

export default Order