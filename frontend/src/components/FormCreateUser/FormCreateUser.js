import { useDispatch, useSelector } from 'react-redux';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { fetchInfoPatients } from '../../ducks/usersGet';
import MySelectComponent from '../MySelectComponent/MySelectComponent'
import { useState } from 'react';
import InputText from '../InputText/InputText';


function FormCreateUser({ roleList }) {

    const dispatch = useDispatch()
    const { patientsLogins } = useSelector((state) => state.usersGet)
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const [successfullyCreateMessage, setSuccessfullyCreateMessage] = useState(false)
    const [errorViewServerMessage, setErrorViewServerMessage] = useState(false)

    const onSubmit = async (info) => {
        try {
            dispatch(
                fetchCreateUser({
                    ...info,
                    birthDay: info.birthDay.toString(),
                    roleList,
                })
            )
                .then((data) => {

                    if (data.type.includes('fulfilled')) {
                        reset()
                        setSuccessfullyCreateMessage(true)
                        setTimeout(() => {
                            setSuccessfullyCreateMessage(false)
                        }, 5000)
                        dispatch(fetchInfoPatients())
                    }

                    if (errorPost) {
                        setErrorViewServerMessage(true)
                        setTimeout(() => {
                            setErrorViewServerMessage(false)
                        }, 5000)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormProvider {...{ formState: { errors }, register }}>
            <div className='form-create-user__container'>
                <form className='form-create-user' onSubmit={handleSubmit(onSubmit)}>

                    <div className='form-create-user__wrapper-input'>
                        <label className="form-create-user__label-input">Дата рождения</label>
                        <Controller
                            name='birthDay'
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    defaultValue={new Date(1980, 1, 1)}
                                    value={field.value}
                                    selected={new Date()}
                                    onChange={(date) => field.onChange(date)}
                                    required
                                />
                            )}
                        />
                    </div>

                    <div className='form-create-user__wrapper-input'>
                        <label className="form-create-user__label-input">Пол</label>
                        <Controller
                            name='gender'
                            control={control}
                            render={({ field }) => (
                                <MySelectComponent
                                    {...field}
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
                    <InputText
                        name='login'
                        label='Логин'
                        requiredMessage={'Это поле обязательно'}
                        errorMessage={'Пожалуйста, введите логин, используя только латинские буквы'}
                        patternRule={/^[a-zA-Z]+$/}
                        loginList={patientsLogins}
                        type='text'
                    />
                    <InputText
                        name='password'
                        label='Пароль'
                        requiredMessage={'Это поле обязательно'}
                        errorMessage={'Минимум 8 символов, одна или более букв верхнего регистра.'}
                        patternRule={/(?=.*[A-Z])[\S]{8,}/}
                        type='password'
                    />

                    <button
                        className='button'
                        type='submit'
                        disabled={Object.values(errors).length > 0 ? 'disabled' : undefined}
                    >
                        {loadingPost ? '...' : 'Создать'}
                    </button>


                    {
                        errorViewServerMessage ? <span className='error'>{errorPost}</span> : null
                    }
                    {
                        successfullyCreateMessage ? <span className='complete-message'>Пациент успешно создан</span> : null
                    }

                </form>
            </div>
        </FormProvider>


    );
}

export default FormCreateUser;