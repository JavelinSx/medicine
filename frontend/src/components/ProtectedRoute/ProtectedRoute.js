import React from 'react';
import { Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
const ProtectedRoute = (({component: Component, ...props}) => {
    const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
    return(
        isAuthenticated && userAuth ? <Component {...props} /> : <Navigate to={`/signin/patient`} />
    )
})

export default ProtectedRoute