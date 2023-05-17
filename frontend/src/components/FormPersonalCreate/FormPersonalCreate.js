import {useForm} from 'react-hook-form';
import { fetchCreateUser } from '../../ducks/usersPost'
import {  useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import FormCreateUser from '../FormCreateUser/FormCreateUser';

function FormPersonalCreate({roleList}) {
    //добвить ресет на форму
    const dispatch = useDispatch()
    const { loadingPost, errorPost } = useSelector((state) => state.usersPost)
    const [createState, setCreateState] = useState(false)

    const toggleCreateUser = () => {
        setCreateState(!createState)
    }

    return ( 
        <>
            <button type='button' onClick={toggleCreateUser}>Создать пользователя</button>
            {
                createState ? 
                <FormCreateUser roleList={roleList} />
                :
                ''
            }

        </>
     );
}

export default FormPersonalCreate;