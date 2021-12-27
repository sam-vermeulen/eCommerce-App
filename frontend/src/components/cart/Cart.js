import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';

import MetaData from '../layouts/MetaData';

import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;

        if (newQuantity > stock) return;

        dispatch(addItemToCart(id, newQuantity));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;

        if (newQuantity < 1) return;

        dispatch(addItemToCart(id, newQuantity));
    };

    const removeItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    }

    return (
        <>
            {cartItems.length === 0 ? <h2 className='mt-5'>Your cart is empty</h2> :(
                <>
                    <MetaData title="Cart" />

                    <h2 className="mt-5">Your Cart: <b>{ cartItems.length }</b></h2>
        
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            <div className="cart-item">

                                { cartItems.map(item => (
                                    <div key={ item.product }>
                                        <hr />
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={ item.image } alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{ item.name }</Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${ item.price.toFixed(2) }</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={ () => decreaseQuantity(item.product, item.quantity) }>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={ () => increaseQuantity(item.product, item.quantity, item.stock) }>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={ () => removeItemHandler(item.product) }></i>
                                            </div>
                                        </div>
                                    </div>
                                )) }
                            </div>
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Number of Items:  <span className="order-summary-values">{ cartItems.reduce((numItems, item) => numItems + Number(item.quantity), 0) } (Units)</span></p>
                                <p>Subtotal: <span className="order-summary-values">${ cartItems.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0).toFixed(2) } </span></p>
                
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart
