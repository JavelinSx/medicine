import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../ducks/auth';
function Header({ resetRole }) {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(fetchLogout())
        localStorage.clear()
        sessionStorage.clear()
        resetRole('patient')
    }

    return (

        <div className='header'>
            <button className='button' onClick={logout} type='button'>Выйти</button>
        </div>

    );
}

export default Header;