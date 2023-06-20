import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function FormCreatePersonal({ roleList }) {
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const { register, handleSubmit } = useForm({
        mode: 'onBlur'
    })
    const onSubmit = (info) => {
        const infoCopy = { ...info }
        dispatch(fetchCreateUser({
            infoCopy,
            roleList,
        }))
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

                {errorPost && <span>{errorPost}</span>}
            </form>
        </div>
    );
}

export default FormCreatePersonal;