import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { fetchUpdateUser } from '../../ducks/usersUpdate'
import DatePicker from 'react-date-picker';
import { isEqual } from 'lodash';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import Cards from '../Cards/Cards';
import { fetchGetAllCards, fetchCreateCard, fetchGetAllCardsFromPatient } from '../../ducks/cards';
import { openPopup } from '../../ducks/popupInteractionUser';
import MySelectComponent from '../MySelectComponent/MySelectComponent';
function PatientProfile() {

    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.popupInteractionUser)
    const { updatedUser } = useSelector((state) => state.usersUpdate)

    const [changedValues, setChangedValues] = useState(null)
    const [checkedChangesValue, setCheckedChangesValue] = useState(false)
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm({
        mode: 'onBlur',

    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const watchedValues = watch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchGetAllCardsFromPatient(updatedUser?._id))

        if (updatedUser) {
            Object.entries(updatedUser).forEach(([fieldName, value]) => {
                setValue(fieldName, value);
            })
        }

        setChangedValues(getValues())
    }, [setValue, updatedUser])

    useEffect(() => {
        setCheckedChangesValue(isEqual(watchedValues, changedValues))
    }, [watchedValues]);

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: { ...data, birthDay: data.birthDay.toString() },
            updatedUser: updatedUser
        }))
    };

    const updateCards = () => {
        setIsButtonDisabled(true);
        dispatch(fetchGetAllCards())
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 5000); // 5000 миллисекунд = 5 секунд

    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            <PopupInteractionUser />
            <div className='patient-profile'>
                <div className='select-role-header'>
                    <button className='button' onClick={handleGoBack}>Назад</button>
                </div>

                <div className='patient-profile__form-container'>
                    <form className='patient-profile__form' onSubmit={handleSubmit(onSubmit)}>

                        <div className='patient-profile__input-wrapper'>
                            <label className='patient-profile__label'>Фамилия</label>
                            <input className='input patient-profile__input' autoComplete="off" {...register('surName')} />
                        </div>

                        <div className='patient-profile__input-wrapper'>
                            <label className='patient-profile__label'>Имя</label>
                            <input className='input patient-profile__input' autoComplete="off" {...register('name')} />
                        </div>

                        <div className='patient-profile__input-wrapper'>
                            <label className='patient-profile__label'>Отчество</label>
                            <input className='input patient-profile__input' autoComplete="off" {...register('middleName')} />
                        </div>


                        <div className='patient-profile__input-wrapper'>
                            <label className="patient-profile__label">Пол</label>
                            <Controller
                                name='gender'
                                control={control}
                                render={({ field }) => (
                                    <MySelectComponent
                                        {...field}
                                        defaultValue={updatedUser?.gender}
                                        optionsProps={
                                            [
                                                { value: 'male', label: 'Муж.' },
                                                { value: 'female', label: 'Жен.' },
                                            ]
                                        }
                                    />
                                )}
                            />
                        </div>

                        <div className='patient-profile__input-wrapper'>
                            <label className='patient-profile__label'>Дата рождения</label>
                            <Controller
                                name='birthDay'
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        selected={field.value || new Date(updatedUser?.birthDay)}
                                        onChange={(date) => field.onChange(date)}
                                    />
                                )}
                            />
                        </div>

                        <button className='button' type="submit" disabled={checkedChangesValue ? 'disabled' : null}>Изменить</button>
                    </form>
                    <button className='button patient-profile__button' onClick={updateCards} disabled={isButtonDisabled}>
                        Обновить данные карточек
                    </button>
                    <button
                        className='button patient-profile__button'
                        onClick={() => dispatch(openPopup({
                            text: `Вы действительно хотите создать карточку для ${updatedUser?.name}`,
                            purpose: 'create',
                            user: updatedUser,
                        }))}
                    >
                        Создать карточку

                    </button>

                </div>

                <div className='patient-profile__cards'>
                    <Cards />
                </div>
            </div>
        </>

    );
}

export default PatientProfile;