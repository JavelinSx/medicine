import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'
import {fetchUpdateUser} from '../../ducks/usersUpdate'
import DatePicker from 'react-date-picker';
import {dateSend} from '../../utils/dateParsing'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import CreateCard from '../CreateCard/CreateCard';
import Cards from '../Cards/Cards';
import { fetchGetAllCards, fetchCreateCard, fetchGetAllCardsFromPatient } from '../../ducks/cards';
function PatientProfile() {
    
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.popupInteractionUser)
    const {userAuth} = useSelector((state) => state.auth)
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: {...data, birthDay: data.birthDay.toString()},
            updatedUser: user
        }))
    };

    const handleCreateCard = () => {
        dispatch(fetchCreateCard(user._id))
        .then(() => {
            dispatch(fetchGetAllCardsFromPatient(user._id))
        })
    }

    const updateCards = () => {
        setIsButtonDisabled(true);
        dispatch(fetchGetAllCards())
        setTimeout(() => {
            setIsButtonDisabled(false);
          }, 5000); // 5000 миллисекунд = 5 секунд

    }

    return (
        <>
            <button onClick={updateCards} disabled={isButtonDisabled}>
                    Обновить данные карточек
            </button>
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
                {errors.exampleRequired && <span>Это поле обязательно</span>}
                <button type="submit">Изменить</button>
            </form>
            <Cards />
            {
                userAuth.role === 'patient' ? null : <CreateCard onConfirm={handleCreateCard} text={`Вы действительно хотите создать карточку для ${user?.name}`} />
            }
        </>
    );
}

export default PatientProfile;