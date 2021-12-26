import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import Search from './Search';

import '../../App.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.user);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully');
    };

    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="text-white navbar-brand">
                        <Link className="brand" to="/">eCommerce App</Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4 pt-2 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ml-3 mr-3">Cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link>

                    { user ? (
                        <div className='dropdown'>
                            <Link to="#" className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <span>{ user && user.name}</span>
                            </Link>
                            
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                <Link className='dropdown-item' to='/orders'>Orders</Link>
                                <Link className='dropdown-item' to='/myprofile'>Profile</Link>

                                <Link className="dropdown-item text-danger" to="/" onClick={ logoutHandler }>
                                    Logout
                                </Link>

                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link> }

                    
                </div>
            </nav>
        </>
    )
}

export default Header
