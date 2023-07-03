import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard } from '../../ducks/cards'
import Card from '../Card/Card';
import { fetchGetCardFile, fetchGetAllCardsFromPatient } from '../../ducks/cards'
import { setCard } from '../../utils/sessionStorageInfo';
import { openPopup } from '../../ducks/popupInteractionUser';

function Cards() {
    const dispatch = useDispatch()

    const { updatedUser } = useSelector((state) => state.usersUpdate)
    const { selectedCard, cardsPatient } = useSelector((state) => state.cards)
    const { userAuth } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.popupInteractionUser)

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchGetAllCardsFromPatient(user?._id))
        }
    }, [])

    const handleOpenCard = (id) => {
        const card = cardsPatient.filter((card) => card._id === id);
        dispatch(fetchGetAllCardsFromPatient(user._id))
        dispatch(fetchGetCardFile({ cardId: card[0]._id, patientId: user._id }))
            .then(() => {
                dispatch(selectCard(card))
                setCard(card)
            })
    }


    return (
        <>
            <ul className='patient-me__cards'>
                {
                    cardsPatient.map((card, index) =>

                        <li key={card._id} className={`patient-me__cards-item ${card.colorCard}`} >
                            <span className='patient-me__cards-item-title' onClick={() => handleOpenCard(card._id)}>
                                Контрольное обследование №: {index + 1} <br />
                                Статус карточки: {card.statusRU}
                            </span>
                            {selectedCard === card._id ? <Card card={card} /> : null}
                            {
                                userAuth.role !== 'patient' ?
                                    <button
                                        className='button button__delete'
                                        onClick={() => dispatch(openPopup({
                                            text: `Вы действительно хотите удалить карточку?`,
                                            purpose: 'delete-card',
                                            user: updatedUser,
                                        }))}
                                    >
                                        X

                                    </button>
                                    : null
                            }
                        </li>

                    )
                }
            </ul>
        </>
    );
}

export default Cards;