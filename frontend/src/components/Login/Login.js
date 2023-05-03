import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from '../../ducks/auth';
import { useNavigate } from 'react-router-dom';

function Login({userRoleLogin}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingAuth, errorAuth } = useSelector((state) => state.auth);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchAuth({login, password, userRoleLogin}))
  };

  const handleGoBack = () => {
    navigate(-1); // перейти на предыдущую страницу
  };

  const handleSelectRole = () => {
    navigate('/select-role')
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={loadingAuth}>
          {loadingAuth ? 'Loading...' : 'Login'}
        </button>
        {errorAuth && <p>{errorAuth}</p>}
      </form>
      <button onClick={handleGoBack}>Вернуться назад</button>
      <button onClick={handleSelectRole}>Вход для персонала</button>
    </div>
  );
}

export default Login;
