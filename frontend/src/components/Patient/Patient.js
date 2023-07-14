import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller, FormProvider } from 'react-hook-form'

import { isEqual } from 'lodash';

import { setCard } from '../../utils/sessionStorageInfo';

import { fetchUpdateUser } from '../../ducks/usersUpdate'
import { selectCard } from '../../ducks/cards'
import { fetchGetCardFile } from '../../ducks/cards'
import { fetchGetAllCardsFromPatient } from '../../ducks/cards';

import DatePicker from 'react-date-picker';
import '../../../node_modules/react-date-picker/dist/DatePicker.css'

import CardForPatient from '../CardForPatient/CardForPatient';
import MySelectComponent from '../MySelectComponent/MySelectComponent';

import InputText from '../InputText/InputText';
import SubmitButton from '../SubmitButton/SubmitButton';



function Patient() {

    const dispatch = useDispatch();
    const { userAuth } = useSelector((state) => state.auth)
    const { updatedUser } = useSelector((state) => state.usersUpdate)
    const { cardsPatient, selectedCard } = useSelector((state) => state.cards)

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    useEffect(() => {
        dispatch(fetchGetAllCardsFromPatient(userAuth._id))
        if (userAuth.role === 'patient') {
            Object.entries(userAuth).forEach(([fieldName, value]) => {
                setValue(fieldName, value);
            })
        }
        setFormSubmitted(false)
    }, [setValue, userAuth])



    const handleOpenCard = (id, event) => {
        if (event.target.tagName.toLowerCase() === 'span') {
            const card = cardsPatient.filter((card) => card._id === id);
            dispatch(fetchGetCardFile({
                cardId: card[0]._id,
                patientId: userAuth._id
            }))
                .then(() => {
                    dispatch(selectCard(card))
                    setCard(card);
                })
        }
    }

    const onSubmit = async (data) => {
        try {
            await dispatch(fetchUpdateUser({
                updatedData: {
                    ...data,
                    birthDay: data.birthDay.toString(),
                },
                updatedUser: userAuth
            }))
            await dispatch(fetchGetAllCardsFromPatient(userAuth._id))
            setFormSubmitted(true)
        } catch (error) {
            setFormSubmitted(false)
        }

    };


    return (
        <>
            <FormProvider {...{ register, handleSubmit, formState: { errors }, control, watch, setValue, getValues }}>
                <div className='patient-me__profile'>
                    <div className='patient-me__profile-container'>
                        <h3 className='patient-me-profile__title'>Ваш профиль</h3>
                        <form className='patient-me__form' onSubmit={handleSubmit(onSubmit)}>
                            <InputText
                                name='surName'
                                label='Фамилия'
                                requiredMessage={'Это поле обязательно'}
                                errorMessage={'Пожалуйста, введите фамилию, используя только русские буквы'}
                                patternRule={/^[а-яёА-ЯЁ]+$/u}
                                type='text'
                            />
                            <InputText
                                name='name'
                                label='Имя'
                                requiredMessage={'Это поле обязательно'}
                                errorMessage={'Пожалуйста, введите имя, используя только русские буквы'}
                                patternRule={/^[а-яёА-ЯЁ]+$/u}
                                type='text'
                            />
                            <InputText
                                name='middleName'
                                label='Отчество'
                                requiredMessage={'Это поле обязательно'}
                                errorMessage={'Пожалуйста, введите отчество, используя только русские буквы'}
                                patternRule={/^[а-яёА-ЯЁ]+$/u}
                                type='text'
                            />
                            <div className='patient-me__form-container'>
                                <label className="patient-me__form-label">Пол</label>
                                <MySelectComponent
                                    name='gender'
                                    defaultValue={userAuth.gender}
                                    optionsProps={
                                        [
                                            { value: 'male', label: 'Муж.' },
                                            { value: 'female', label: 'Жен.' },
                                        ]
                                    }
                                />
                            </div>

                            <div className='patient-me__form-container'>
                                <label className='patient-me__form-label'>Дата рождения</label>
                                <Controller
                                    name='birthDay'
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            value={field.value}
                                            selected={field.value || new Date(userAuth?.birthDay)}
                                            onChange={(date) => field.onChange(date)}
                                        />
                                    )}
                                />
                            </div>

                            <SubmitButton
                                data={updatedUser ? updatedUser : userAuth}
                                formSubmitted={formSubmitted}
                                onSubmit={onSubmit}
                                classNamePrefix=''
                                textButton='Изменить'
                            />
                        </form>
                    </div>
                </div>
            </FormProvider>


            <div className='patient-me__form-card-container'>
                <h3 className='patient-me-profile__title'>Ваши карточки</h3>
                <ul className='patient-me__cards'>
                    {
                        cardsPatient.map((card, index) =>
                            <li key={card._id} className={`patient-me__cards-item ${card.colorCard}`} onClick={(event) => handleOpenCard(card._id, event)}>
                                <span className='patient-me__cards-item-title'>
                                    Карточка №: {index + 1} <br />
                                    Статус карточки: {card.statusRU}
                                </span>
                                {selectedCard === card._id ? <CardForPatient card={card} /> : ''}
                            </li>
                        )
                    }
                </ul>
            </div>
        </>

    );
}

export default Patient;