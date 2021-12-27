import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems : [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const item = action.payload;
                
                const doesItemExist = state.cartItems.find(i => i.product === item.product);

                if (doesItemExist) {
                    return {
                        ...state,
                        cartItems: state.cartItems.map(i => (i.product === item.product ? item : i))
                    }
                } else {
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item]
                    };
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
            
        default:
            return state;
    }
};