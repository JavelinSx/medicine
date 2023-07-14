import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form'
import { fetchDeleteHelpMessage } from '../../ducks/usersPost'
import { fetchInfoDoctorMessage } from '../../ducks/usersGet'

function MessagePatient() {
    const dispatch = useDispatch();
    const { helpMessage } = useSelector((state) => state.usersGet)
    const { userAuth } = useSelector((state) => state.auth)

    const deleteMessage = async (data) => {
        try {
            await dispatch(fetchDeleteHelpMessage(data))
            await dispatch(fetchInfoDoctorMessage(userAuth._id))
        } catch (error) {

        }

    }
    return (
        <>
            <ul className="message-patient">
                {
                    helpMessage?.length === 0 ? <li className='message-patient__item'>Нет сообщений</li>
                        :
                        helpMessage.map((message) => {
                            return (
                                <li key={message._id} className='message-patient__item' >
                                    <span className='message-patient__name'>{message.user}</span>
                                    <span className='message-patient__title'>{message.comments}</span>

                                    <button className='button message-patient__button' onClick={() => deleteMessage({ id: message._id })}>X</button>
                                </li>
                            )
                        })
                }
            </ul>
        </>
    );
}

export default MessagePatient;