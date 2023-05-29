import React, { useEffect, useState } from 'react';
import { setCard } from '../../utils/sessionStorageInfo';
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'
import {fetchUpdateUser} from '../../ducks/usersUpdate'
import {selectCard} from '../../ducks/cards'
import {fetchGetCardFile} from '../../ducks/cards'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import CardForPatient from '../CardForPatient/CardForPatient';
import { fetchGetAllCardsFromPatient } from '../../ducks/cards';
function Patient() {
    
    const dispatch = useDispatch();
    const {userAuth} = useSelector((state) => state.auth)
    const {cardsPatient, selectedCard} = useSelector((state) => state.cards)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {register, handleSubmit, formState: { errors }, control, setValue} = useForm({
        mode: 'onBlur',
    })

    useEffect(() => {
        dispatch(fetchGetAllCardsFromPatient(userAuth._id))
        if(userAuth.role === 'patient'){
            Object.entries(userAuth).forEach(([fieldName, value]) => {
                setValue(fieldName, value)
            })
        }

    },[setValue, userAuth])

    const handleOpenCard = (id, event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            const card = cardsPatient.filter((card) => card._id === id);
            dispatch(fetchGetCardFile({cardId:card[0]._id, patientId: userAuth._id}))
            .then(() => dispatch(selectCard(card)))
            
            setCard(card);
            
        }
    }

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: {...data, birthDay: data.birthDay.toString()},
            updatedUser: userAuth
        }))
    };

    const updateCards = () => {
        setIsButtonDisabled(true);
        dispatch(fetchGetAllCardsFromPatient(userAuth._id))
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
                            selected={field.value || new Date(userAuth?.birthDay)}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                {errors.exampleRequired && <span>Это поле обязательно</span>}
                <button type="submit">Изменить</button>
            </form>
            <ul>
                {
                    cardsPatient.map((card) => 
                        <li key={card._id}  onClick={(event) => handleOpenCard(card._id, event)}>
                            patientId: {card.patientId};
                            status: {card.status};
                            {selectedCard === card._id ? <CardForPatient card={card} /> : ''}
                        </li>
                    )
                }
            </ul>
        </>
    );
}

export default Patient;