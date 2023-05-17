
import {  useSelector, useDispatch } from 'react-redux';
function Cards() {
    const { patients, doctors, registrars, nurses, cards} = useSelector((state) => state.usersGet)
    return ( 
        <>
            <div>
                {
                    cards.map((card) => <div>{card.patient}</div>)
                }
            </div>
        </>
     );
}

export default Cards;