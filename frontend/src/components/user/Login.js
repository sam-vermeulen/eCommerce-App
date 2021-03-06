import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { login, clearErrors } from '../../actions/userActions'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, error, loading } = useSelector(state => state.user);

    const redirect = location.search ? location.search.split('=')[1] : ''

    useEffect(() => {
        
        if (isAuthenticated) {
            navigate(`../${redirect}`, { replace: true });
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
    }, [dispatch, alert, isAuthenticated, error, navigate, redirect])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title='Login' />
                    <div className="row wrapper"> 
                        <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                
                            <div className="form-group mt-4">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                                <div className="container">
                                    <div className="row">
                                        <button
                                            id="login_button"
                                            type='submit'
                                            className="btn btn-block py-3">
                                        LOGIN
                                        </button>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col">
                                            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
                                        </div>
                                        <div className="col">
                                            <Link to="/register" className="float-right mt-3">New User?</Link>
                                        </div>
                                    </div>
                                </div>
                        </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Login
