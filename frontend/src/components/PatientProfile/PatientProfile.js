import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { fetchUpdateUser } from '../../ducks/usersUpdate'
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';
import Cards from '../Cards/Cards';
import { fetchInfoPatients } from '../../ducks/usersGet'
import { openPopup } from '../../ducks/popupInteractionUser';
import MySelectComponent from '../MySelectComponent/MySelectComponent';
import InputText from '../InputText/InputText';
import SubmitButton from '../SubmitButton/SubmitButton';
import { patternInputTextRu } from '../../utils/constant'
function PatientProfile() {

    const dispatch = useDispatch();
    const { updatedUser } = useSelector((state) => state.usersUpdate)

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const navigate = useNavigate();

    useEffect(() => {

        if (updatedUser) {
            Object.entries(updatedUser).forEach(([fieldName, value]) => {
                setValue(fieldName, value);
            })
        }
        setFormSubmitted(false)
    }, [setValue, updatedUser])


    const onSubmit = async (data) => {
        try {
            await dispatch(fetchUpdateUser({
                updatedData: { ...data, birthDay: data.birthDay?.toString() },
                updatedUser: updatedUser
            }))
            await dispatch(fetchInfoPatients())
            setFormSubmitted(true)

        } catch (error) {
            setFormSubmitted(false)
        }

    };


    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            <PopupInteractionUser />

            <FormProvider {...{ register, handleSubmit, formState: { errors }, control, watch, setValue, getValues }} >
                <div className='patient-profile'>
                    <div className='select-role-header'>
                        <button className='button' onClick={handleGoBack}>Назад</button>
                    </div>

                    <div className='patient-profile__form-container'>
                        <div className='patient-profile__profile'>
                            <h4 className='patient-profile__title'>Профиль пациента</h4>
                            <form className='patient-profile__form' onSubmit={handleSubmit(onSubmit)}>
                                <InputText
                                    name='surName'
                                    label='Фамилия'
                                    requiredMessage={'Это поле обязательно'}
                                    errorMessage={'Пожалуйста, введите фамилию, используя только русские буквы'}
                                    patternRule={patternInputTextRu}
                                    type='text'
                                />
                                <InputText
                                    name='name'
                                    label='Имя'
                                    requiredMessage={'Это поле обязательно'}
                                    errorMessage={'Пожалуйста, введите имя, используя только русские буквы'}
                                    patternRule={patternInputTextRu}
                                    type='text'
                                />
                                <InputText
                                    name='middleName'
                                    label='Отчество'
                                    requiredMessage={'Это поле обязательно'}
                                    errorMessage={'Пожалуйста, введите отчество, используя только русские буквы'}
                                    patternRule={patternInputTextRu}
                                    type='text'
                                />
                                <div className='patient-profile__input-wrapper'>
                                    <label className="patient-profile__label">Пол</label>
                                    <MySelectComponent
                                        name='gender'
                                        defaultValue={updatedUser?.gender}
                                        optionsProps={
                                            [
                                                { value: 'male', label: 'Муж.' },
                                                { value: 'female', label: 'Жен.' },
                                            ]
                                        }
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

                                <SubmitButton
                                    data={updatedUser}
                                    formSubmitted={formSubmitted}
                                    onSubmit={onSubmit}
                                    classNamePrefix=''
                                    textButton='Изменить'
                                />
                            </form>
                        </div>

                        <div className='patient-profile__cards'>
                            <h4 className='patient-profile__cards-title'>Карточки пациента</h4>
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

                            <div className='patient-profile__cards-container'>
                                <Cards />
                            </div>
                        </div>


                    </div>

                </div>
            </FormProvider>

        </>

    );
}

export default PatientProfile;