import React from 'react'

import { useNavigate, Link } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useSelector } from 'react-redux'

const ConfirmOrder = () => {

    const navigate = useNavigate();

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    // Calculuate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = 25;
    const taxPrice = 0.13 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const proceedToPaymentHandler = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        };
        
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    return (
        <>
            <MetaData title="Confirm Order" />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> { user && user.name }</p>
                    <p><b>Phone:</b> { shippingInfo.phoneNumber } </p>
                    <p className="mb-4"><b>Address:</b> { `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}` }</p>
                    
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    { cartItems.map(item => (
                        <div key={item.product}>
                            <hr />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={ item.image } alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={ `/products/${item.product}` }>{ item.name }</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price.toFixed(2)} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                    
                    <hr />

                </div>
                
                <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">${itemsPrice.toFixed(2)}</span></p>
                            <p>Shipping: <span className="order-summary-values">${shippingPrice.toFixed(2)}</span></p>
                            <p>Tax (13%):  <span className="order-summary-values">${taxPrice.toFixed(2)}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">${totalPrice.toFixed(2)}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPaymentHandler}>Proceed to Payment</button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default ConfirmOrder
