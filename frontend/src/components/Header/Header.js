import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogout } from '../../ducks/auth';
function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(fetchLogout())
        localStorage.clear()
        sessionStorage.clear()
    }


    return (

        <div className='header'>
            <button className='button' onClick={logout} type='button'>Выйти</button>
        </div>

    );
}

export default Header;