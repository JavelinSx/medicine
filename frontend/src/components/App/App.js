import './App.css'
import '../Login/Login'

import React, {useState, useMemo, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCookie } from '../../ducks/auth';

import Login from '../Login/Login'
import SelectRole from '../SelectRole/SelectRole';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Personal from '../Personal/Personal'
import Patient from '../Patient/Patient';
import PatientProfile from '../PatientProfile/PatientProfile'
import PersonalProfile from '../PersonalProfile/PersonalProfile'

function App (){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const [userRoleLogin, setUserRoleLogin] = useState('patient')

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchCookie(userAuth.role))
    }
  }, []);

  useEffect(() => {
    userAuth && userAuth.role==='patient' ? 
    navigate(`/profile/patient/me`)
    :
    navigate (`/profile/personal/me`)
  },[userAuth])


  const handleSelectLoginRole = (loginRole) => {
    setUserRoleLogin(loginRole)
}

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route 
          exact path='/select-role' 
          element={<SelectRole handleSelectLoginRole={handleSelectLoginRole}/>} 
        />
        <Route 
          exact path='/signin/:role' 
          element={<Login userRoleLogin={userRoleLogin}/>} />
        <Route exact path='/profile/patient/me' element={
          <ProtectedRoute 
            component={Patient}
          />
        } />
        <Route exact path='/profile/personal/me' element={
          <ProtectedRoute 
            component={Personal}
          />
        } />
        <Route exact path='/profile/patient/:id' element={
          <ProtectedRoute 
            component={PatientProfile}
          />
        } />
        <Route exact path='/profile/personal/:id' element={
          <ProtectedRoute 
            component={PersonalProfile}
          />
        } />

      </Routes>
    </div>
  )
}

export default App
