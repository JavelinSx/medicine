import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'
import {fetchUpdateUser} from '../../ducks/usersUpdate'
import DatePicker from 'react-date-picker';
import {dateSend} from '../../utils/dateParsing'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Card from '../Card/Card';
function PatientProfile() {
    
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.popupInteractionUser)

    const {register, handleSubmit, formState: { errors }, control} = useForm({
        mode: 'onBlur',
        defaultValues:{
            surName: user?.surName || '',
            name: user?.name || '',
            middleName: user?.middleName || '',
            gender: user?.gender || '',
            birthDay: user?.birthDay ? new Date(user?.birthDay) : new Date()
        }
    })

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: {...data, birthDay: dateSend(data.birthDay)},
            updatedUser: user
        }))
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('surName')} placeholder='Фамилия' />
                <input {...register('name')} placeholder='Имя' />
                <input {...register('middleName')} placeholder='Отчество' />
                <select {...register('gender')}>
                    <option value="male">Муж.</option>
                    <option value="female">Жен.</option>
                </select>

                <Controller
                    name='birthDay'
                    control={control}

                    render={({ field }) => (
                        <DatePicker
                            value={field.value}
                            selected={field.value || new Date(user?.birthDay)}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit">Изменить</button>
            </form>
            <Card />
        </>
    );
}

export default PatientProfile;