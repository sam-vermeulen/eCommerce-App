import React, { useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, clearErrors } from '../../actions/orderActions';

const OrderById = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { isAuthenticated } = useSelector(state => state.user);
    const { loading, error, order = {}} = useSelector(state => state.orderById);
    const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;

    if (!isAuthenticated) {
        navigate('/login?redirect=orders', { replace: true });
    }

    useEffect(() => {
        dispatch(getOrderById(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, params.id]);

    return (
        <>
            <MetaData title={'Order Details'} />
            { loading ? <Loader /> : (
                <>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {order._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user && user.name}</p>
                            <p><b>Phone:</b> { shippingInfo && shippingInfo.phoneNumber }</p>
                            <p className="mb-4"><b>Address:</b> { shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}` }</p>
                            <p><b>Amount:</b> ${ Number(totalPrice).toFixed(2) }</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className='greenColor'><b>PAID</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={ order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor' }><b>{ orderStatus }</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                { orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/products/${item.product}`}>{ item.name }</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>Price: ${ item.price }</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>Quantity: { item.quantity}</p>
                                        </div>
                                    </div>
                                ))} 
                            </div>
                        </div>
                    </div>
                </>
            ) }
        </>
    );
};

export default OrderById;
