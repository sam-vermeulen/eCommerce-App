import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAlert } from 'react-alert';

import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import axios from 'axios';
import { clearErrors } from '../../actions/userActions';

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
};

const Payment = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    useEffect(() => {
        
    }, [])

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;

        // process payment
        try {
            const config = { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/payment/process', paymentData, config);

            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                // error paying
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // pay success
                    navigate('/success');
                } else {
                    // failed to pay
                    alert.error('An error occurred while processing payment');
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.error.message);
        }
    }

    return (
        <>
            <MetaData title="Payment" />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper mt-4">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
                    
                    <div className="form-group mt-4">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
                    
                    <div className="form-group mt-4">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
        
                    <div className='container row'>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                        Pay
                        </button>
                    </div>
        
                </form>
                </div>
            </div>
        </>
    )
}

export default Payment
