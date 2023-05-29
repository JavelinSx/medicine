
import Form from '../Form/Form'
import {fetchDeleteCard} from '../../ducks/cards'
import { useDispatch } from 'react-redux';
function Card({card}) {
    const dispatch = useDispatch()
    const deleteCard = () => {
        dispatch(fetchDeleteCard(card._id))
    }

    return ( 
        <>
            <Form />
            <button type='button' onClick={deleteCard}>Удалить карточку</button>
        </>
     );
}

export default Card;