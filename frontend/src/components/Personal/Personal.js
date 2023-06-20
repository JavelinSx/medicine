import React, { useState, useMemo, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import ListPersonal from '../ListPersonal/ListPersonal';
import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import { toggleStatePatient, toggleStateDoctor, toggleStateRegistrar, toggleStateNurse } from '../../ducks/listState'
import { fetchInfoPatients, fetchInfoDoctors, fetchInfoNurses, fetchInfoRegistrars, } from '../../ducks/usersGet';
import { fetchGetAllCards } from '../../ducks/cards'

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
        if (userAuth.role !== 'patient') {
            if (patients.length === 0) {
                dispatch(fetchInfoPatients('patients'))
            }
            if (doctors.length === 0) {
                dispatch(fetchInfoDoctors('doctors'));
            }
            if (registrars.length === 0) {
                dispatch(fetchInfoRegistrars('registrars'));
            }
            if (nurses.length === 0) {
                dispatch(fetchInfoNurses('nurses'));
            }
            if (cards.length === 0) {
                dispatch(fetchGetAllCards());
            }
        }
    }, []);



    return (
        <div className='personal__list-container'>
            <PopupInteractionUser />
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
        </div>


    );
}

export default Personal;