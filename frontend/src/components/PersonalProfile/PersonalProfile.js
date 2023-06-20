import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { fetchUpdateUser } from '../../ducks/usersUpdate'
function PersonalProfile() {
    //необходимо скодить работу со списком получаемого на обновление пользователя
    const { user } = useSelector((state) => state.popupInteractionUser)
    const { updatedUser } = useSelector((state) => state.usersUpdate)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onBlur',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (updatedUser) {
            Object.entries(updatedUser).forEach(([fieldName, value]) => {
                setValue(fieldName, value);
            })
        }
    })

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: data,
            updatedUser: user
        }))
    };

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='personal-profile'>
            <button className='button personal-profile__back-button' onClick={handleGoBack}>Назад</button>
            <div className='personal-profile__container'>

                <form className='personal-profile__form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='personal-profile__wrapper-input'>
                        <label className="personal-profile__label-input">Фамилия</label>
                        <input className='input' {...register('surName')} />
                    </div>
                    <div className='personal-profile__wrapper-input'>
                        <label className="personal-profile__label-input">Имя</label>
                        <input className='input' {...register('name')} />
                    </div>
                    <div className='personal-profile__wrapper-input'>
                        <label className="personal-profile__label-input">Отчество</label>
                        <input className='input' {...register('middleName')} />
                    </div>


                    {errors.exampleRequired && <span>Это поле обязательно</span>}
                    <button className='button' type="submit">Изменить</button>
                </form>
            </div>
        </div>

    );
}

export default PersonalProfile;