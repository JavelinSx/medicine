import { useDispatch } from 'react-redux';
import { openPopup } from '../../ducks/popupInteractionUser';

function ListPersonalItem({ user }) {

    const dispatch = useDispatch()
    return (
        <div className='list-personal-item__container'>
            <h5 className='list-personal-item__title'>{`${user.name} ${user.surName}`}</h5>

            <div className='list-personal-item__button-container'>
                <button
                    type="button"
                    className='button button__profile'
                    onClick={() => dispatch(openPopup({
                        text: `Вы хотите перейти в профиль ${user.name + ' ' + user.surName}?`,
                        purpose: 'edit',
                        user: user,
                    }))}
                >
                    Редактировать

                </button>

                <button
                    type="button"
                    className='button button__profile'
                    onClick={() => dispatch(openPopup({
                        text: `Вы хотите удалить ${user.name + ' ' + user.login}?`,
                        purpose: 'delete',
                        user: user
                    }))}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default ListPersonalItem;