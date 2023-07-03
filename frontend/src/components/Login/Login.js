import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, resetErrorAuth } from '../../ducks/auth';
import { useNavigate } from 'react-router-dom';

function Login({ userRoleLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingAuth, errorAuth } = useSelector((state) => state.auth);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchAuth({ login, password, userRoleLogin }))
  };

  const handleSelectRole = () => {
    dispatch(resetErrorAuth())
    navigate('/select-role')
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit}>

        <input
          className='input login-form__input'
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <input
          className='input login-form__input'
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='button' type="submit" disabled={loadingAuth}>
          {loadingAuth ? 'Вход...' : 'Войти'}
        </button>
        <button className='button' onClick={handleSelectRole}>Вход для персонала</button>
        {errorAuth && <p className='error'>{errorAuth}</p>}
      </form>

    </div>
  );
}

export default Login;
