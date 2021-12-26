import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../layouts/MetaData'

import { register, clearErrors } from '../../actions/userActions'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.user);

    useEffect(() => {
        
        if (isAuthenticated) {
            navigate(`/`);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
    }, [dispatch, alert, isAuthenticated, error, navigate])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(register(user));
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <>
            <MetaData title="Register User" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group mt-4">
                            <label htmlFor="email_field">Name</label>
                            <input 
                                type="name" 
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange} />
                        </div>

                        <div className="form-group mt-4">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email" 
                                value={email} 
                                onChange={onChange} 
                            />
                        </div>
        
                        <div className="form-group mt-4">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                            />
                        </div>
                        <div className="container row">
                            <button
                                id="register_button"
                                type="submit" 
                                className="btn btn-block py-3"
                                disabled={loading ? true : false }
                                >
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
