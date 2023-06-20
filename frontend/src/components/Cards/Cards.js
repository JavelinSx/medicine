import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard } from '../../ducks/cards'
import Card from '../Card/Card';
import { fetchGetCardFile, fetchGetAllCardsFromPatient } from '../../ducks/cards'
import CardForPatient from '../CardForPatient/CardForPatient';
import { fetchDeleteCard } from '../../ducks/cards'
import { openPopup } from '../../ducks/popupInteractionUser';
import { setCard } from '../../utils/sessionStorageInfo';

function Cards() {
    const dispatch = useDispatch()
    const { selectedCard, cardsPatient } = useSelector((state) => state.cards)
    const { userAuth } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.popupInteractionUser)

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchGetAllCardsFromPatient(user?._id))
        }
    }, [])

    const handleOpenCard = (id, event, cardLi) => {
        // if (event.target.tagName.toLowerCase() === 'span') {
        console.log()
        const card = cardsPatient.filter((card) => card._id === id);
        console.log(cardLi)
        console.log(card)
        dispatch(fetchGetAllCardsFromPatient(user._id))
        dispatch(fetchGetCardFile({ cardId: card[0]._id, patientId: user._id }))
            .then(() => {
                dispatch(selectCard(card))
                setCard(card)
            })
        // }
    }


    return (
        <>
            <ul className='patient-me__cards'>
                {
                    cardsPatient.map((card, index) =>

                        <li key={card._id} className={`patient-me__cards-item ${card.colorCard}`} >
                            <span className='patient-me__cards-item-title' onClick={(event) => handleOpenCard(card._id, event, card)}>
                                Карточка №: {index + 1} <br />
                                Статус карточки: {card.statusRU}
                            </span>
                            {selectedCard === card._id ? <Card card={card} /> : null}
                        </li>

                    )
                }
            </ul>
        </>
    );
}

export default Cards;