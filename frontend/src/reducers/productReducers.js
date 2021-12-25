import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS,
         ALL_PRODUCTS_FAIL, PRODUCT_SUCCESS,
         PRODUCT_FAIL, PRODUCT_REQUEST,
         ERRORS_CLEAR } from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            };

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                itemsPerPage: action.payload.itemsPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };

        case ALL_PRODUCTS_FAIL:
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
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };

        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };

        case PRODUCT_FAIL:
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
};