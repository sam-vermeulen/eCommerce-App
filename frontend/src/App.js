import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import ViewOrders from './components/order/ViewOrders';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ProtectRoute from './components/ProtectRoute';
import store from './store';
import { loadUser } from './actions/userActions';
import OrderById from './components/order/OrderById';

function App() {

    useEffect(() => {
        store.dispatch(loadUser());
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

                            <Route path="/shipping" element={
                                <ProtectRoute redirectTo="/login">
                                    <Shipping />
                                </ProtectRoute>
                            } />

                            <Route path="/orders" element={ <ViewOrders /> } />

                            <Route path="/confirm" element={
                                <ProtectRoute redirectTo="/login">
                                    <ConfirmOrder />
                                </ProtectRoute>
                            } />

                            <Route path="/success" element={
                                <ProtectRoute redirectTo="/login">
                                    <OrderSuccess />
                                </ProtectRoute>
                            } />

                            <Route path="/payment" element={
                                <ProtectRoute redirectTo="/login">
                                    <Payment />
                                </ProtectRoute>
                            } />

                            <Route path="/order/:id" element={<OrderById />} />
                        </Routes>
                    </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
