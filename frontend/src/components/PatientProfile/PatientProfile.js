import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'
import {fetchUpdateUser} from '../../ducks/usersUpdate'
import DatePickerControler from '../DatePickerController/DatePickerController';
function PatientProfile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.popupInteractionUser)
    const {register, handleSubmit, formState: { errors }, control} = useForm({
        mode: 'onBlur',
        defaultValues:{
            surName: user?.surName,
            name: user?.name,
            middleName: user?.middleName,
            gender: user?.gender,
            birthDay: user?.birthDay
        }
    })

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: data,
            updatedUser: user
        }))
    };
    console.log(user)
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

                <DatePickerControler initialValue={user?.birthDay} />
                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit">Изменить</button>
            </form>
        </>
    );
}

export default PatientProfile;