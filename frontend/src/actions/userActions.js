import axios from 'axios';

import { 
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    ERRORS_CLEAR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL } from '../constants/userConstants';

// login
export const login = (email, password) => async (dispatch) => {
    try {
        
        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/login', { email, password }, config);

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.error.message
        });
    }
};

// register
export const register = (user) => async (dispatch) => {
    try {
        
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/register', user, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error.message
        });
    }
};

// load user
export const loadUser = () => async (dispatch) => {
    try {
        
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/myprofile');

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// logout
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/logout');

        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ERRORS_CLEAR });
};
