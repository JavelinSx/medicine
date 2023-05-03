import './Personal.css'
import React, {useState, useMemo, useEffect} from 'react'
import Select from 'react-select';
import {  useSelector, useDispatch } from 'react-redux';
import { fetchInfoPatients, fetchInfoDoctors, fetchInfoNurses, fetchInfoRegistrars } from '../../ducks/usersGet';
import { fetchCreateUser } from '../../ducks/usersPost'
import { selectRoleUser } from '../../utils/constant';
import ListPersonal from '../ListPersonal/ListPersonal';
import PopupInteractionUser from '../PopupInteractionUser/PopupInteractionUser';

function Personal() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { createdUser, loadingPost, errorPost } = useSelector((state) => state.usersPost)
    const { patients, doctors, registrars, nurses, loadingGet, errorGet} = useSelector((state) => state.usersGet)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [userRole, setUserRole] = useState(null)
    //Необходимо отображать выбранный список пользователей с возможностью перехода в профиль
    //Необходимо вырезать создание пользователя в отдельный попап вызываемый по кнопке
    //Необходима кнопка обновить список, для каждого и для всей информации с дизейблд таймаутом
    //

    useEffect(() => {
        if(user.role!=='patient'){
            if(patients.length===0){
                dispatch(fetchInfoPatients('patients'))
            }
            if(doctors.length===0){
                dispatch(fetchInfoDoctors('doctors'));
            }
            if(registrars.length===0){
                dispatch(fetchInfoRegistrars('registrars'));
            }
            if(nurses.length===0){
                dispatch(fetchInfoNurses('nurses'));
            }  
        }
    }, []);

    const handleSubmitCreateUser = (event) => {
        event.preventDefault()
        dispatch(fetchCreateUser({login, password, userRole}))
    }

    return ( 
        <>
            <PopupInteractionUser/>
            <ListPersonal nameList={'Пациенты'} propsList={'patients'}/>
            <ListPersonal nameList={'Доктора'} propsList={'doctors'}/>
            <ListPersonal nameList={'Регистраторы'} propsList={'registrars'}/>
            <ListPersonal nameList={'Медсестры'} propsList={'nurses'}/>
            
            <ul className='personal__list-info'>
                <li>Мои данные</li>
                <li>{user.login}</li>
                <li>{user.role}</li>
            </ul>

            <form onSubmit={handleSubmitCreateUser}>
                <Select 
                    required
                    defaultValue={userRole}
                    onChange={(event) => setUserRole(event.value)}
                    options={selectRoleUser}
                />
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" disabled={loadingPost}>
                    {loadingPost ? 'Creating...' : 'Create'}
                </button>
                    {errorPost && <p>{errorPost}</p>}
            </form>
        </>

        
    );
}

export default Personal;