import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

const OrderSuccess = () => {

    return (
        <>
            <MetaData title="Order Success" />  

            <div className='row justify-content-center'>
                <div className='col-6 mt-5 text-center'>
                    <h2>Your order has been placed successfully.</h2>

                    <Link to='/orders' type="button" id="orders_btn" className="btn btn-block py-3">Go to orders</Link>
                </div>
            </div>
        </>
    );
};


export default OrderSuccess;
