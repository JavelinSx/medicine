import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import { fetchLogout } from '../../ducks/auth';
function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);

    const loginPageOpen = () => {
        navigate('/signin/patient')
    }

    const logout = () => {
        dispatch(fetchLogout())
    }

    const goBack = () => {
        navigate(-1)
    }

    return ( 
        <>
            {
                isAuthenticated ? <button onClick={logout} type='button'>Выйти</button> : <button onClick={loginPageOpen} type='button'>Войти</button>
            }
            <button type="button" onClick={goBack}>Назад</button>
        </>
     );
}

export default Header;