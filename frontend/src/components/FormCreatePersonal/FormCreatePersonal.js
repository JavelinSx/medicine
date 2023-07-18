import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';
import { fetchInfoDoctors } from '../../ducks/usersGet';
import InputText from '../InputText/InputText';
import { patternInputTextRu, patternInputTextEn, patternInputTextPassword } from '../../utils/constant'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function FormCreatePersonal({ roleList }) {
    const [successfullyCreateMessage, setSuccessfullyCreateMessage] = useState(false)
    const [errorViewServerMessage, setErrorViewServerMessage] = useState(false)
    const [loginListPersonal, setLoginListPersonal] = useState([])
    const dispatch = useDispatch()
    const { errorPost } = useSelector((state) => state.usersPost)
    const { doctorsLogins, registrarsLogins, nursesLogins } = useSelector((state) => state.usersGet)

    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues, reset } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    useEffect(() => {
        if (roleList === 'doctor') {
            setLoginListPersonal(doctorsLogins)
        }
        if (roleList === 'nurse') {
            setLoginListPersonal(nursesLogins)
        }
        if (roleList === 'registrar') {
            setLoginListPersonal(registrarsLogins)
        }

    }, [roleList])

    const onSubmit = async (info) => {
        try {

            await dispatch(fetchCreateUser({
                ...info,
                roleList,
            }))

            if (errorPost) {
                setErrorViewServerMessage(true)
                setTimeout(() => {
                    setErrorViewServerMessage(false)
                }, 5000)
            } else {
                reset()
                setSuccessfullyCreateMessage(true)
                setTimeout(() => {
                    setSuccessfullyCreateMessage(false)
                }, 5000)
                dispatch(fetchInfoDoctors())
            }

        } catch (error) {

        }

    }
    return (
        <div className='form-create-personal__container'>
            <FormProvider {...{ register, handleSubmit, formState: { errors }, control, watch, setValue, getValues }}>
                <form className='form-create-personal' onSubmit={handleSubmit(onSubmit)}>

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
                    <InputText
                        name='login'
                        label='Логин'
                        requiredMessage={'Это поле обязательно'}
                        errorMessage={'Пожалуйста, введите логин, используя только латинские буквы'}
                        patternRule={patternInputTextEn}
                        loginList={loginListPersonal}
                        type='text'
                    />
                    <InputText
                        name='password'
                        label='Пароль'
                        requiredMessage={'Это поле обязательно'}
                        errorMessage={'Минимум 8 символов, одна или более букв верхнего регистра.'}
                        patternRule={patternInputTextPassword}
                        type='password'
                    />

                    <button className='button' type='submit' text='Создать'>Создать</button>

                    {
                        errorViewServerMessage ? <span className='error'>{errorPost}</span> : null
                    }
                    {
                        successfullyCreateMessage ? <span className='complete-message'>Пациент успешно создан</span> : null
                    }
                </form>
            </FormProvider>

        </div>
    );
}

export default FormCreatePersonal;