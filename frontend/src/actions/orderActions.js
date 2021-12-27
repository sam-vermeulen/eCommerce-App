import axios from 'axios';

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ERRORS_CLEAR,
    GET_ORDERS_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/order/new', order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.message })
    }
};

// get logged in users orders
export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDERS_REQUEST });

        const { data } = await axios.get('/api/orders/me');

        dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({  type: GET_ORDERS_FAIL, payload: error.response.data.message })
    }
};

// get order by id
export const getOrderById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST });

        const { data } = await axios.get(`/api/order/${id}`);

        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({  type: GET_ORDER_FAIL, payload: error.response.data.message })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ERRORS_CLEAR });
};