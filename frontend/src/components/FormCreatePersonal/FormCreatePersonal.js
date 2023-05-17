import {useState} from 'react'
import {  useDispatch, useSelector } from 'react-redux';

import {useForm, Controller} from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {dateSend} from '../../utils/dateParsing'
function FormCreatePersonal({roleList}) {
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const {register, handleSubmit, formState: {errors}, control} = useForm({
        mode: 'onBlur'
    })
    const onSubmit = (info) => {
        const infoCopy = {...info}
        dispatch(fetchCreateUser({
            infoCopy,
            roleList,
        }))
    }
    return ( 
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('surName')} placeholder='Фамилия' />
                <input {...register('name')} placeholder='Имя' />
                <input {...register('middleName')} placeholder='Отчество' />
                <input {...register('login')} placeholder='Login' />
                <input {...register('password')} type='password' placeholder='Password' />

                <button type='submit' text='Создать'>Создать</button>

                {errorPost && <span>{errorPost}</span>}
            </form>
        </>
     );
}

export default FormCreatePersonal;