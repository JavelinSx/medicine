import './ListPeronslItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux';
import { openPopup} from '../../ducks/popupInteractionUser';

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
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>

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
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>

        </>
     );
}

export default ListPersonalItem;