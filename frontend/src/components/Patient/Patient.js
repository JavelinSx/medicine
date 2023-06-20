import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'

import { isEqual } from 'lodash';

import { setCard } from '../../utils/sessionStorageInfo';

import {fetchUpdateUser} from '../../ducks/usersUpdate'
import {selectCard} from '../../ducks/cards'
import {fetchGetCardFile} from '../../ducks/cards'
import { fetchGetAllCardsFromPatient } from '../../ducks/cards';

import DatePicker from 'react-date-picker';
import '../../../node_modules/react-date-picker/dist/DatePicker.css'

import CardForPatient from '../CardForPatient/CardForPatient';
import MySelectComponent from '../MySelectComponent/MySelectComponent';



function Patient() {
    
    const dispatch = useDispatch();
    const {userAuth} = useSelector((state) => state.auth)
    const {cardsPatient, selectedCard} = useSelector((state) => state.cards)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [changedValues, setChangedValues] = useState(null)
    const [checkedChangesValue, setCheckedChangesValue] = useState(false)
    const {register, handleSubmit, formState: { errors }, control, setValue, watch, getValues } = useForm({
        mode: 'onBlur',
    })

    const watchedValues = watch();

    useEffect(() => {
        dispatch(fetchGetAllCardsFromPatient(userAuth._id))
        if(userAuth.role === 'patient'){
            Object.entries(userAuth).forEach(([fieldName, value]) => {
                setValue(fieldName, value);  
            })
        }
        setChangedValues(getValues())
    },[setValue, userAuth])

    useEffect(() => {
        setCheckedChangesValue(isEqual(watchedValues, changedValues))
    }, [watchedValues]);

    const handleOpenCard = (id, event) => {
        console.log(event.target.tagName.toLowerCase())
        if (event.target.tagName.toLowerCase() === 'span') {
            const card = cardsPatient.filter((card) => card._id === id);
            dispatch(fetchGetCardFile({cardId:card[0]._id, patientId: userAuth._id}))
                .then(() => {
                    dispatch(selectCard(card))
                    setCard(card);
                })  
        }
    }

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: {
                ...data, 
                birthDay: data.birthDay.toString(),
            },
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
        <div className='patient-me__profile'>
            <div className='patient-me__profile-container'>
                <h3 className='patient-me-profile__title'>Ваш профиль</h3>
                <form className='patient-me__form' onSubmit={handleSubmit(onSubmit)}>

                    <div className='patient-me__form-container'>
                        <label className='patient-me__form-label'>Фамилия</label>
                        <input className='input patient-me__form-input' autoComplete="off" {...register('surName')} />
                    </div>
                    <div className='patient-me__form-container'>
                        <label className='patient-me__form-label'>Имя</label>
                        <input className='input patient-me__form-input' autoComplete="off" {...register('name')} />
                    </div>
                    <div className='patient-me__form-container'>
                        <label className='patient-me__form-label'>Отчество</label>
                        <input className='input patient-me__form-input' autoComplete="off" {...register('middleName')} />
                    </div>
                    <div className='patient-me__form-container'>
                        <label className="patient-me__form-label">Пол</label>
                        <Controller
                            name='gender'
                            control={control}
                            render = {({field}) => (
                                <MySelectComponent 
                                    {...field}
                                    defaultValue={userAuth.gender}
                                    optionsProps={
                                        [
                                            {value: 'male', label: 'Муж.'},
                                            {value: 'female', label: 'Жен.'},
                                        ]
                                    }
                                />
                            )}
                        />
                    </div>

                    <div className='patient-me__form-container'>
                        <label className='patient-me__form-label'>Дата рождения</label>
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
                    </div>

                    {errors.exampleRequired && <span>Это поле обязательно</span>}
                    <button className='button' type="submit" disabled={checkedChangesValue ? 'disabled' : null}>Изменить профиль</button>
                </form>
            </div>

            <div className='patient-me__form-card-container'>
                <h3 className='patient-me-profile__title'>Ваши карточки</h3>
                <button className='button' onClick={updateCards} disabled={isButtonDisabled}>
                        Обновить данные карточек
                </button>
                <ul className='patient-me__cards'>
                    {
                        cardsPatient.map((card,index) => 
                            
                            <li key={card._id} className={`patient-me__cards-item ${card.colorCard}`} onClick={(event) => handleOpenCard(card._id, event)}>
                                <span className='patient-me__cards-item-title'>
                                    Карточка №: {index+1} <br/>
                                    Статус карточки: {card.statusRU}
                                </span>
                                {selectedCard === card._id ? <CardForPatient card={card} /> : ''}
                            </li>
                        
     
                        )
                    }
                </ul>
            </div>

        </div>
    );
}

export default Patient;