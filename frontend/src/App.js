import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';

import { loadUser } from './actions/userActions';
import store from './store';

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
                        </Routes>
                    </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
