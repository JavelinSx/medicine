import { setCard } from '../../utils/sessionStorageInfo';
import { setPatient } from '../../utils/sessionStorageInfo';
import {  useSelector, useDispatch } from 'react-redux';
import {selectCard} from '../../ducks/card'
import Card from '../Card/Card';
import {fetchGetCardFile} from '../../ducks/usersGet'
function Cards() {
    const dispatch = useDispatch()
    const {cards} = useSelector((state) => state.usersGet)
    const {user} = useSelector((state) => state.popupInteractionUser)
    const {selectedCard} = useSelector((state) => state.card)
    const patientCards = cards.filter((card) => card.patient === user?._id)

    const handleOpenCard = (id, event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            const card = patientCards.filter((card) => card._id === id);
            console.log(Object.keys(card[0]).filter((field) => field==='fileMRT' || field==='fileKT'))
            setCard(card);
            // dispatch(fetchGetCardFile())
            dispatch(selectCard(card));
        }
    }

    return ( 
        <>
            <ul>
                {
                    patientCards.map((card) => 
                        <li key={card._id}  onClick={(event) => handleOpenCard(card._id, event)}>
                            {card.patient}
                            {card.status}
                            {selectedCard === card._id ? <Card card={card} /> : ''}
                        </li>
                    )
                }
            </ul>
        </>
     );
}

export default Cards;