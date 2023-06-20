
import Form from '../Form/Form'
import {fetchDeleteCard} from '../../ducks/cards'
import {  useSelector, useDispatch } from 'react-redux';
import { openPopup } from '../../ducks/popupInteractionUser';
function Card({card}) {
    const dispatch = useDispatch()
    const {userAuth} = useSelector((state) => state.auth)
    const {updatedUser} = useSelector((state) => state.usersUpdate)

    return ( 
        <>
            <Form />
            {
                userAuth.role !== 'patient' ?                          
                <button  
                        className='button card__button'
                        onClick={() => dispatch(openPopup({
                            text: `Вы действительно хотите удалить карточку?`, 
                            purpose: 'delete-card',
                            user: updatedUser,
                        }))}
                >
                Удалить карточку

                </button> 
            : null
            }
        </>
     );
}

export default Card;