import { 
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    ERRORS_CLEAR
} from '../constants/userConstants';

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };

        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };


        case LOGOUT_USER_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
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
};