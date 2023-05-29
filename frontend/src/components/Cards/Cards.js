import { useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import {selectCard} from '../../ducks/cards'
import Card from '../Card/Card';
import {fetchGetCardFile, fetchGetAllCardsFromPatient} from '../../ducks/cards'

function Cards() {
    const dispatch = useDispatch()
    const {selectedCard, cardsPatient} = useSelector((state) => state.cards)
    const {user} = useSelector((state) => state.popupInteractionUser)

    useEffect(() => {
        if(user?._id){
            dispatch(fetchGetAllCardsFromPatient(user?._id))
        }
    }, [])
    
    
    console.log(cardsPatient)

    const handleOpenCard = (id, event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            const card = cardsPatient.filter((card) => card._id === id);
            dispatch(fetchGetAllCardsFromPatient(user._id))
            dispatch(fetchGetCardFile({cardId:card[0]._id, patientId: user._id}))
                .then(() => {
                    dispatch(selectCard(card))
                }) 
        }
    }

    return ( 
        <>
            <ul>
                {
                    cardsPatient.map((card) => 
                        <li key={card._id}  onClick={(event) => handleOpenCard(card._id, event)}>
                            patientId: {card.patientId};
                            status: {card.status};
                            {selectedCard === card._id ? <Card card={card} /> : ''}
                        </li>
                    )
                }
            </ul>
        </>
     );
}

export default Cards;