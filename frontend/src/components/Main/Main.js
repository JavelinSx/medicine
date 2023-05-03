import React from 'react';
import { useNavigate } from 'react-router-dom';
function Main() {
    const navigate = useNavigate();
    const loginPageOpen = () => {
        navigate('/signin/patient')
    }
    return ( 
        <>
            <button onClick={loginPageOpen} type='button'>Login</button>
        </>
    );
}

export default Main;