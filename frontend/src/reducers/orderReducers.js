import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    ERRORS_CLEAR
} from '../constants/orderConstants';

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case ERRORS_CLEAR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    };
};

export const getOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                loading: true
            };

        case GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };

        case GET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case ERRORS_CLEAR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const getOrderByIdReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                loading: true
            };

        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };

        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case ERRORS_CLEAR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}