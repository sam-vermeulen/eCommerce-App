import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { saveShippingInfo } from '../../actions/cartActions';

const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
    const [country, setCountry] = useState(shippingInfo.phoneNumber);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo({ address, city, phoneNumber, postalCode, country }));
        navigate('/confirm');
    };

    return (
        <>
            <MetaData title="Shipping" />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={ address }
                                onChange={ (e) => setAddress(e.target.value) }
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={ city }
                                onChange={ (e) => setCity(e.target.value) }
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={ phoneNumber }
                                onChange={ (e) => setPhoneNumber(e.target.value) }
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                id="postal_code_field"
                                className="form-control"
                                value={ postalCode }
                                onChange={ (e) => setPostalCode(e.target.value) }
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={ country }
                                onChange={ (e) => setCountry(e.target.value) }
                                required
                            >
                                <option></option>
                                    <option>
                                        Canada
                                    </option>
                                    <option>
                                        USA
                                    </option>

                            </select>
                        </div>

                        <div className="container row">
                            <button
                                id="shipping_btn"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                CONTINUE
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping
