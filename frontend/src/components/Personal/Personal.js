import React, { useState, useMemo, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import ListPersonal from '../ListPersonal/ListPersonal';
import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import { toggleStatePatient, toggleStateDoctor, toggleStateRegistrar, toggleStateNurse } from '../../ducks/listState'
import { fetchInfoPatients, fetchInfoDoctors, fetchInfoNurses, fetchInfoRegistrars, fetchInfoDoctorMessage } from '../../ducks/usersGet';
import { fetchGetAllCards } from '../../ducks/cards'
import PersonalProfile from '../PersonalProfile/PersonalProfile';

function Personal() {
    const dispatch = useDispatch();
    const { userAuth } = useSelector((state) => state.auth);

    const { patients, doctors, registrars, nurses } = useSelector((state) => state.usersGet)
    const { cards } = useSelector((state) => state.cards)
    const { listStatePatient, listStateDoctor, listStateNurse, listStateRegistrar } = useSelector((state) => state.listState)

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

    useEffect(() => {
        if (userAuth.role !== 'patient') {

            dispatch(fetchInfoPatients('patients'))

            dispatch(fetchInfoDoctors('doctors'));

            dispatch(fetchInfoRegistrars('registrars'));

            dispatch(fetchInfoNurses('nurses'));

            dispatch(fetchGetAllCards());

            if (userAuth.role === 'doctor') {
                console.log(userAuth)
                dispatch(fetchInfoDoctorMessage(userAuth._id))
            }

        }
    }, []);



    return (
        <div className='personal__list-container'>
            <PopupInteractionUser />
            <div className='personal__list-profile'>
                <h3 className='personal__list-profile-title'>Ваш профиль</h3>
                <PersonalProfile />
            </div>
            <div className='personal__list-managment'>
                <h3 className='personal__list-profile-title'>Управление базой данных</h3>
                <ListPersonal
                    nameList={'Пациенты'}
                    list={patients}
                    roleList='patient'
                    toggleListUser={toggleListPatient}
                    listState={listStatePatient}

                />
                <ListPersonal
                    nameList={'Доктора'}
                    list={doctors}
                    roleList='doctor'
                    toggleListUser={toggleListDoctor}
                    listState={listStateDoctor}

                />
                <ListPersonal
                    nameList={'Регистраторы'}
                    list={registrars}
                    roleList='registrar'
                    toggleListUser={toggleListRegistrar}
                    listState={listStateRegistrar}

                />
                <ListPersonal
                    nameList={'Медсестры'}
                    list={nurses}
                    roleList='nurse'
                    toggleListUser={toggleListNurse}
                    listState={listStateNurse}

                />
            </div>

        </div>


    );
}

export default Personal;