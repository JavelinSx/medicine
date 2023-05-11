import {useForm} from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost'
import {  useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'

function FormPersonalCreate({roleList}) {
    //добвить ресет на форму
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const [createState, setCreateState] = useState(false)
    console.log(roleList)

    const onSubmit = (info) => {
        dispatch(fetchCreateUser({
            info, roleList
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

export default FormPersonalCreate;