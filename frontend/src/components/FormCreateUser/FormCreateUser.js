import { useDispatch, useSelector } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { fetchInfoPatients } from '../../ducks/usersGet';
import MySelectComponent from '../MySelectComponent/MySelectComponent'

function FormCreateUser({ roleList }) {

    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        mode: 'onBlur'
    })

    const onSubmit = (info) => {

        dispatch(
            fetchCreateUser({
                ...info,
                birthDay: info.birthDay.toString(),
                roleList,
            })
        )
            .then(() => reset())
            .then(() => dispatch(fetchInfoPatients()))

    }

    return (
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
                                defaultValue='male'
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
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Фамилия</label>
                    <input className='input form-create-user__input' {...register('surName')} />
                </div>
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Имя</label>
                    <input className='input form-create-user__input' {...register('name')} />
                </div>
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Отчество</label>
                    <input className='input form-create-user__input' {...register('middleName')} />
                </div>
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Логин</label>
                    <input className='input form-create-user__input' {...register('login')} />
                </div>
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Пароль</label>
                    <input className='input form-create-user__input' {...register('password')} type='password' />
                </div>

                <button className='button' type='submit' text='Создать'>Создать</button>

                {errorPost && <span>{errorPost}</span>}
            </form>
        </div>

    );
}

export default FormCreateUser;