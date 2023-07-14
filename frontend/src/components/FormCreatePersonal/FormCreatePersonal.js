import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';
import { fetchInfoDoctors } from '../../ducks/usersGet';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function FormCreatePersonal({ roleList }) {
    const [successfullyCreateMessage, setSuccessfullyCreateMessage] = useState(false)
    const [errorViewServerMessage, setErrorViewServerMessage] = useState(false)
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

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
            <form className='form-create-personal' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-create-personal__wrapper-input'>
                    <label className="form-create-personal__label-input">Фамилия</label>
                    <input className='input' {...register('surName')} />
                </div>
                <div className='form-create-personal__wrapper-input'>
                    <label className="form-create-personal__label-input">Имя</label>
                    <input className='input' {...register('name')} />
                </div>
                <div className='form-create-personal__wrapper-input'>
                    <label className="form-create-personal__label-input">Отчество</label>
                    <input className='input' {...register('middleName')} />
                </div>
                <div className='form-create-personal__wrapper-input'>
                    <label className="form-create-personal__label-input">Логин</label>
                    <input className='input' {...register('login')} />
                </div>
                <div className='form-create-personal__wrapper-input'>
                    <label className="form-create-personal__label-input">Пароль</label>
                    <input className='input' {...register('password')} type='password' />
                </div>

                <button className='button' type='submit' text='Создать'>Создать</button>

                {
                    errorViewServerMessage ? <span className='error'>{errorPost}</span> : null
                }
                {
                    successfullyCreateMessage ? <span className='complete-message'>Пациент успешно создан</span> : null
                }
            </form>
        </div>
    );
}

export default FormCreatePersonal;