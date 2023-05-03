import React from 'react';
import { Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
const ProtectedRoute = (({component: Component, ...props}) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(user)
    return(
        isAuthenticated && user ? <Component {...props} /> : <Navigate to={`/signin/patient`} />
    )
})

export default ProtectedRoute