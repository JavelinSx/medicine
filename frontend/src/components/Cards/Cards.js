import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard, toggleWaitLoad, resetSelectCard } from '../../ducks/cards'
import Card from '../Card/Card';
import { fetchGetCardFile, fetchGetAllCardsFromPatient } from '../../ducks/cards'
import { setCard } from '../../utils/sessionStorageInfo';


function Cards() {
    const dispatch = useDispatch()

    const { selectedCard, cardsPatient } = useSelector((state) => state.cards)
    const { user } = useSelector((state) => state.popupInteractionUser)

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchGetAllCardsFromPatient(user?._id))
        }
    }, [])


    const handleOpenCard = async (event, card) => {
        try {
            //сначала мы ждём файлы, потом делаем selectCard
            if (event.target.tagName === 'SPAN') {
                await dispatch(toggleWaitLoad(card._id));

                if (selectedCard !== card._id) {
                    await dispatch(fetchGetCardFile({ cardId: card._id, patientId: user._id }));
                    await dispatch(selectCard(card));
                }

                await setCard(card);

                await dispatch(toggleWaitLoad(card._id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rollUp = async () => {
        await dispatch(resetSelectCard())
    }


    return (
        <>
            <ul className='patient-me__cards'>
                {
                    cardsPatient.map((card, index) =>

                        <li key={card._id} className={`patient-me__cards-item ${card?.colorCard}`} >

                            <div className={`card-blur ${card?.waitLoad ? 'show-card' : 'hide-card'}`}>
                                <span className='card-blur-title'>Данные загружаются</span>
                            </div>
                            <span className={`patient-me__cards-item-title`}
                                onClick={(event) => handleOpenCard(event, card)}>
                                Контрольное обследование №: {index + 1} <br />
                                Статус карточки: {card?.statusRU}
                            </span>

                            {selectedCard === card._id ? <Card card={card} /> : null}
                            {selectedCard === card._id ?
                                <button className='button button-roll-up' title='Свернуть' onClick={rollUp}>^</button>
                                : ''
                            }

                        </li>

                    )
                }
            </ul>
        </>
    );
}

export default Cards;