import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';

import { Link, useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux';
import { getOrders, clearErrors } from '../../actions/orderActions';

const ViewOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector(state => state.user);
    const { loading, error, orders } = useSelector(state => state.myOrders);

    if (!isAuthenticated) {
        navigate('/login?redirect=orders', { replace: true });
    }

    useEffect(() => {
        dispatch(getOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    // SETUP THE MDB TABLE DATA
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        if (orders) {
            orders.forEach(order => {
                data.rows.push({
                    id: order._id,
                    numItems: order.orderItems.length,
                    amount: `$${order.totalPrice.toFixed(2)}`,
                    status: order.orderStatus && String(order.orderStatus).includes('Delivered') ?
                                <p style={{ color: 'green' }}>{order.orderStatus}</p> :
                                <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                    actions: <Link to={`/order/${order._id}`} className="btn btn-primary"><i className='fa fa-eye'></i></Link>

                })
            });
        }

        return data ? data : '';
    };

    return (
        <>
            <MetaData title="My Orders" />
            <h1 className='mt-5'>My Orders</h1>

            { loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className='px-3'
                    bordered
                    striped
                    hover
                />
            )}
        </>
    );
};

export default ViewOrders;
