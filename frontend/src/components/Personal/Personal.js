import './Personal.css'
import React, {useState, useMemo, useEffect} from 'react'

import {  useSelector, useDispatch } from 'react-redux';

import { selectRoleUser } from '../../utils/constant';
import ListPersonal from '../ListPersonal/ListPersonal';
import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import { toggleStatePatient, toggleStateDoctor, toggleStateRegistrar, toggleStateNurse } from '../../ducks/listState'
import { fetchInfoPatients, fetchInfoDoctors, fetchInfoNurses, fetchInfoRegistrars } from '../../ducks/usersGet';

function Personal() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { patients, doctors, registrars, nurses} = useSelector((state) => state.usersGet)
    const { listStatePatient, listStateDoctor, listStateNurse, listStateRegistrar } = useSelector((state) => state.listState)
    const [userRole, setUserRole] = useState(null)

    //Необходимо отображать выбранный список пользователей с возможностью перехода в профиль
    //Необходимо вырезать создание пользователя в отдельный попап вызываемый по кнопке
    //Необходима кнопка обновить список, для каждого и для всей информации с дизейблд таймаутом
    //

    const [listState, setListState] = useState(false)

    const toggleListPatient = () => {
        dispatch(toggleStatePatient())
    }
    const toggleListNurse = () => {
        dispatch(toggleStateNurse())
    }
    const toggleListDoctor = () => {
        dispatch(toggleStateDoctor())
    }
    const toggleListRegistrar = () => {
        dispatch(toggleStateRegistrar())
    }

    const updatePatientsList = () => {
        dispatch(fetchInfoPatients())
    }
    const updateDoctorsList = () => {
        dispatch(fetchInfoDoctors())
    }
    const updateNursesList = () => {
        dispatch(fetchInfoNurses())
    }
    const updateRegistrarsList = () => {
        dispatch(fetchInfoRegistrars())
    }

    useEffect(() => {
        if(user.role!=='patient'){
            if(patients.length===0){
                dispatch(fetchInfoPatients('patients'))
            }
            if(doctors.length===0){
                dispatch(fetchInfoDoctors('doctors'));
            }
            if(registrars.length===0){
                dispatch(fetchInfoRegistrars('registrars'));
            }
            if(nurses.length===0){
                dispatch(fetchInfoNurses('nurses'));
            }  
        }
    }, []);



    return ( 
        <>
            <PopupInteractionUser/>
            <ListPersonal 
                nameList={'Пациенты'} 
                list={patients} 
                roleList='patient' 
                toggleListUser={toggleListPatient} 
                listState={listStatePatient}
                updateList={updatePatientsList}
            />
            <ListPersonal 
                nameList={'Доктора'} 
                list={doctors} 
                roleList='doctor' 
                toggleListUser={toggleListDoctor} 
                listState={listStateDoctor}
                updateList={updateDoctorsList}
            />
            <ListPersonal 
                nameList={'Регистраторы'} 
                list={registrars} 
                roleList='registrar' 
                toggleListUser={toggleListRegistrar} 
                listState={listStateRegistrar}
                updateList={updateRegistrarsList}
            />
            <ListPersonal 
                nameList={'Медсестры'} 
                list={nurses} 
                roleList='nurse' 
                toggleListUser={toggleListNurse} 
                listState={listStateNurse}
                updateList={updateNursesList}
            />
            
            <ul className='personal__list-info'>
                <li>Мои данные</li>
                <li>{user.login}</li>
                <li>{user.role}</li>
            </ul>


        </>

        
    );
}

export default Personal;