import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListPersonal from '../ListPersonal/ListPersonal';
import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import {
    toggleStatePatient,
    toggleStateDoctor,
    toggleStateRegistrar,
    toggleStateNurse,
} from '../../ducks/listState';
import {
    fetchInfoPatients,
    fetchInfoDoctors,
    fetchInfoNurses,
    fetchInfoRegistrars,
    fetchInfoDoctorMessage,
} from '../../ducks/usersGet';
import { fetchGetAllCards } from '../../ducks/cards';
import PersonalProfile from '../PersonalProfile/PersonalProfile';

function Personal() {
    const dispatch = useDispatch();
    const { userAuth } = useSelector((state) => state.auth);
    const { patients, doctors, registrars, nurses } = useSelector((state) => state.usersGet);
    const { listStatePatient, listStateDoctor, listStateNurse, listStateRegistrar } = useSelector(
        (state) => state.listState
    );

    const [isPatientClicked, setIsPatientClicked] = useState(false);
    const [isDoctorClicked, setIsDoctorClicked] = useState(false);
    const [isRegistrarClicked, setIsRegistrarClicked] = useState(false);
    const [isNurseClicked, setIsNurseClicked] = useState(false);

    useEffect(() => {
        if (isPatientClicked) {
            dispatch(fetchInfoPatients('patients'));
            dispatch(toggleStatePatient());
        }
    }, [dispatch, isPatientClicked]);

    useEffect(() => {
        if (isDoctorClicked) {
            dispatch(fetchInfoDoctors('doctors'));
            dispatch(toggleStateDoctor());
        }
    }, [dispatch, isDoctorClicked]);

    useEffect(() => {
        if (isRegistrarClicked) {
            dispatch(fetchInfoRegistrars('registrars'));
            dispatch(toggleStateRegistrar());
        }
    }, [dispatch, isRegistrarClicked]);

    useEffect(() => {
        if (isNurseClicked) {
            dispatch(fetchInfoNurses('nurses'));
            dispatch(toggleStateNurse());
        }
    }, [dispatch, isNurseClicked]);

    useEffect(() => {
        if (userAuth.role !== 'patient') {
            dispatch(fetchGetAllCards());

            if (userAuth.role === 'doctor') {
                dispatch(fetchInfoDoctorMessage(userAuth._id));
            }
        }
    }, [dispatch, userAuth]);

    const handleToggleListPatient = () => {
        setIsPatientClicked((prevState) => !prevState);
    };

    const handleToggleListNurse = () => {
        setIsNurseClicked((prevState) => !prevState);
    };

    const handleToggleListDoctor = () => {
        setIsDoctorClicked((prevState) => !prevState);
    };

    const handleToggleListRegistrar = () => {
        setIsRegistrarClicked((prevState) => !prevState);
    };

    return (
        <div className="personal__list-container">
            <PopupInteractionUser />
            <div className="personal__list-profile">
                <h3 className="personal__list-profile-title">Ваш профиль</h3>
                <PersonalProfile />
            </div>
            <div className="personal__list-managment">
                <h3 className="personal__list-profile-title">Управление базой данных</h3>
                <ListPersonal
                    nameList={'Пациенты'}
                    list={patients}
                    roleList="patient"
                    toggleListUser={handleToggleListPatient}
                    listState={listStatePatient}
                />
                <ListPersonal
                    nameList={'Доктора'}
                    list={doctors}
                    roleList="doctor"
                    toggleListUser={handleToggleListDoctor}
                    listState={listStateDoctor}
                />
                <ListPersonal
                    nameList={'Регистраторы'}
                    list={registrars}
                    roleList="registrar"
                    toggleListUser={handleToggleListRegistrar}
                    listState={listStateRegistrar}
                />
                <ListPersonal
                    nameList={'Медсестры'}
                    list={nurses}
                    roleList="nurse"
                    toggleListUser={handleToggleListNurse}
                    listState={listStateNurse}
                />
            </div>
        </div>
    );
}

export default Personal;
