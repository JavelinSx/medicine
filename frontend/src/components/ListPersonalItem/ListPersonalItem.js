import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux';
import { openPopup } from '../../ducks/popupInteractionUser';

function ListPersonalItem({user}) {

    const dispatch = useDispatch()
    return ( 
        <div className='list-personal-item__container'>
                <h3 className='list-personal-item__title'>{user.login}</h3>

                <div className='list-personal-item__button-container'>
                    <button 
                        type="button" 
                        className='button'
                        onClick={() => dispatch(openPopup({
                            text:`Вы хотите перейти в профиль ${user.name+' '+user.surName}?`, 
                            purpose: 'edit',
                            user: user,
                        }))}
                    >
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>

                    </button>

                    <button 
                        type="button" 
                        className='button'
                        onClick={() => dispatch(openPopup({
                            text:`Вы хотите удалить ${user.name+' '+user.login}?`, 
                            purpose: 'delete',
                            user: user
                        }))}
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                </div>
        </div>
     );
}

export default ListPersonalItem;