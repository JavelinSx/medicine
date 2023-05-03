import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {dismissPopup} from '../../ducks/popupInteractionUser'
import { fetchDeletePatient } from '../../ducks/usersDelete';
import { setUserUpdated } from '../../ducks/usersUpdate';
import {useNavigate} from 'react-router-dom'
const PopupInteractionUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isOpen, text, purpose, user} = useSelector((state) => state.popupInteractionUser)


    const handleConfirm = () => {
        console.log(user)
        if(purpose==='edit'){
            const pathPatient = `/profile/patient/${user._id}`
            const pathPersonal = `/profile/personal/${user._id}`
            dispatch(setUserUpdated(user))
            user.role==='patient' ? navigate(pathPatient) : navigate(pathPersonal)
            return dispatch(dismissPopup())
        }
        if(purpose==='delete'){

            dispatch(fetchDeletePatient(user))
            return dispatch(dismissPopup())
        }
    };

    const handleCancel = () => {
        dispatch(dismissPopup())
    };



    return isOpen
        ? createPortal(
            <div className="popup-confirm">
            <div className="popup-confirm__text">{text}</div>
            <div className="popup-confirm__buttons">
                <button onClick={handleConfirm}>OK</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            </div>,
            document.body
        )
        : null;
};

export default PopupInteractionUser;