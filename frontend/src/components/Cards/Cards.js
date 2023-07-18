import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard, toggleWaitLoad, resetSelectCard } from '../../ducks/cards'
import Card from '../Card/Card';
import { fetchGetCardFile, fetchGetAllCardsFromPatient } from '../../ducks/cards'
import { setCard, getCard, setCardsPatient, getCardsPatient } from '../../utils/sessionStorageInfo';
import { openPopup } from '../../ducks/popupInteractionUser';

function Cards() {
    const dispatch = useDispatch()

    const { updatedUser } = useSelector((state) => state.usersUpdate)
    const { selectedCard, cardsPatient, cardFiles, card } = useSelector((state) => state.cards)
    const { userAuth } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.popupInteractionUser)

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchGetAllCardsFromPatient(user?._id))
        }
    }, [])


    const handleOpenCard = async (card) => {
        try {
            //сначала мы ждём файлы, потом делаем selectCard

            await dispatch(toggleWaitLoad(card._id));

            if (selectedCard !== card._id) {
                await dispatch(fetchGetCardFile({ cardId: card._id, patientId: user._id }));
                await dispatch(selectCard(card));
            }

            await setCard(card);

            await dispatch(toggleWaitLoad(card._id));




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

                            <div className={`card-blur ${card?.waitLoad ? 'hide-card' : 'show-card'}`}>
                                Данные загружаются
                            </div>
                            <span className={`patient-me__cards-item-title`}
                                onClick={() => handleOpenCard(card)}>
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