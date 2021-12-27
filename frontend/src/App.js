import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';

function App() {

    useEffect(() => {
    }, []);

    return (
        <Router>
            <div className="App">
                <Header />
                    <div className="container container-fluid">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search/:keyword" element={<Home />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route path="/cart" element={<Cart />} />
                            <Route path="/shipping" element={<Shipping />} />
                            <Route path="/confirm" element={<ConfirmOrder />} />
                            <Route path="/payment" element={<Payment />} />
                        </Routes>
                    </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
