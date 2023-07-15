import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../ducks/auth';
function Header({ resetRole }) {

    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await dispatch(fetchLogout())
            await localStorage.clear()
            await sessionStorage.clear()
            await resetRole('patient')
        } catch (error) {

        }

    }

    return (

        <div className='header'>
            <button className='button' onClick={logout} type='button'>Выйти</button>
        </div>

    );
}

export default Header;