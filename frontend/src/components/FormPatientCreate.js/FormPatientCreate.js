import {useForm} from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost'
import {  useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'

function FormPatientCreate({roleList}) {
    //добвить ресет на форму
    //добавить дату и выбор пола
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const [createState, setCreateState] = useState(false)


    const onSubmit = (data) => {
        dispatch(fetchCreateUser({
            data, roleList
        }))
    }
    const toggleCreateUser = () => {
        setCreateState(!createState)
    }

    return ( 
        <>
            <button type='button' onClick={toggleCreateUser}>Создать пользователя</button>
            {
                createState ? 
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('surName')} placeholder='Фамилия' />
                    <input {...register('name')} placeholder='Имя' />
                    <input {...register('middleName')} placeholder='Отчество' />
                    <input {...register('login')} placeholder='Login' />
                    <input {...register('password')} type='password' placeholder='Password' />

                    <button type='submit' text='Создать'>Создать</button>

                    {errorPost && <span>{errorPost}</span>}
                </form>
                :
                ''
            }

        </>
     );
}

export default FormPatientCreate;