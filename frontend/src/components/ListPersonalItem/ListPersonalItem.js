import './ListPeronslItem.css'
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openPopup, closePopup, setText, confirmPopup } from '../../ducks/popupInteractionUser';
import { fetchDeletePatient } from '../../ducks/usersDelete';

function ListPersonalItem({user}) {

    const dispatch = useDispatch()

    return ( 
        <>
                
                {user.login}
                <button 
                    type="button" 
                    className='button__list-item_edit button__list-item'
                    onClick={() => dispatch(openPopup({
                        text:`Вы хотите перейти в профиль ${user.name+' '+user.login}?`, 
                        purpose: 'edit',
                        user: user,
                    }))}
                >
                    

                </button>
                <button 
                    type="button" 
                    className='button__list-item_delete button__list-item'
                    onClick={() => dispatch(openPopup({
                        text:`Вы хотите удалить ${user.name+' '+user.login}?`, 
                        purpose: 'delete',
                        user: user
                    }))}
                >

                </button>

        </>
     );
}

export default ListPersonalItem;