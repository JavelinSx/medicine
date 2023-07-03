import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissPopup } from '../../ducks/popupInteractionUser'
import { setUserInfo } from '../../ducks/auth'
import { fetchDeletePatient } from '../../ducks/usersDelete';
import { setUserUpdated } from '../../ducks/usersUpdate';
import { fetchGetAllCards, fetchCreateCard, fetchGetAllCardsFromPatient } from '../../ducks/cards';
import { fetchDeleteCard } from '../../ducks/cards'
import { useNavigate } from 'react-router-dom'
const PopupInteractionUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { card } = useSelector((state) => state.cards)
    const { isOpen, text, purpose, user } = useSelector((state) => state.popupInteractionUser)

    const handleConfirm = () => {

        if (purpose === 'edit') {
            const pathPatient = `/profile/patient/${user._id}`
            const pathPersonal = `/profile/personal/${user._id}`
            dispatch(setUserUpdated(user))
            user.role === 'patient' ? navigate(pathPatient) : navigate(pathPersonal)

        }

        if (purpose === 'delete') {
            dispatch(fetchDeletePatient(user))
        }

        if (purpose === 'create') {
            dispatch(fetchCreateCard(user._id))
                .then(() => {
                    dispatch(fetchGetAllCardsFromPatient(user._id))
                })
        }

        if (purpose === 'delete-card') {
            dispatch(fetchDeleteCard(card._id))
        }

        return dispatch(dismissPopup())
    };

    const handleCancel = () => {
        dispatch(dismissPopup())
    };

    return isOpen
        ? createPortal(
            <div className="popup-interaction-user">
                <div className='popup-interaction-user__wrapper'>
                    <h4 className="popup-interaction-user__text">{text}</h4>

                    <div className="popup-interaction-user__buttons">
                        <button className='button' onClick={handleConfirm}>Oк</button>
                        <button className='button' onClick={handleCancel}>Отмена</button>
                    </div>
                </div>
            </div>,
            document.getElementById('app')
        )
        : null;
};

export default PopupInteractionUser;