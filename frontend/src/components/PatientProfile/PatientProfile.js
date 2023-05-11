import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {fetchUpdateUser} from '../../ducks/usersUpdate'

function PatientProfile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.popupInteractionUser)
    const {register, handleSubmit, formState: { errors }} = useForm({
        mode: 'onBlur',
        defaultValues:{
            surName: user.surName,
            name: user.name,
            middleName: user.middleName,
        }
    })

    const onSubmit = (data) => {
        dispatch(fetchUpdateUser({
            updatedData: data,
            updatedUser: user
        }))
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('surName')} placeholder='Фамилия' />
                <input {...register('name')} placeholder='Имя' />
                <input {...register('middleName')} placeholder='Отчество' />
                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit">Изменить</button>
            </form>
        </>
    );
}

export default PatientProfile;