import {useState} from 'react'
import {  useDispatch, useSelector } from 'react-redux';

import {useForm, Controller} from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {dateSend} from '../../utils/dateParsing'
import { fetchInfoPatients } from '../../ducks/usersGet';
function FormCreateUser({roleList}) {

    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const {register, handleSubmit, formState: {errors}, control, reset} = useForm({
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
        <>    
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='birthDay'
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            defaultValue={new Date(1980,1,1)}
                            value={field.value}
                            selected={new Date()}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                <select {...register('gender')}>
                    <option value="male">Муж.</option>
                    <option value="female">Жен.</option>
                </select>
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

export default FormCreateUser;