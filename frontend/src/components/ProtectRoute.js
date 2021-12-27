import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, redirectTo }) => {

    const {isAuthenticated } = useSelector(state => state.user);

    return (isAuthenticated ? children : <Navigate to={redirectTo} />);
};

export default ProtectRoute;
