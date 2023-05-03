import './ListPeronsonal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh, faPause } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from 'react'
import ListPersonalItem from "../ListPersonalItem/ListPersonalItem";
import { fetchInfoPatients, fetchInfoDoctors, fetchInfoNurses, fetchInfoRegistrars } from '../../ducks/usersGet';
import {  useSelector, useDispatch } from 'react-redux';

function ListPersonal({ nameList, propsList }) {
    const dispatch = useDispatch();
    const { patients, doctors, registrars, nurses, loadingGet, errorGet} = useSelector((state) => state.usersGet)
    const { errorPost } = useSelector((state) => state.usersDelete)
    const [list, setList] = useState([])
    const [listState, setListState] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        switch (propsList) {
          case 'patients':
            setList(patients);
            break;
          case 'doctors':
            setList(doctors);
            break;
          case 'nurses':
            setList(nurses);
            break;
          case 'registrars':
            setList(registrars);
            break;
          default:
            setList([]);
            break;
        }
      }, [propsList, patients, doctors, nurses, registrars]);

    const handleListPersonalOpen = () => {
        switch (propsList) {
            case 'patients': setList(patients); break;
            case 'doctors' : setList(doctors); break;
            case 'nurses' : setList(nurses); break;
            case 'registrars' : setList(registrars); break;
            default: ; break;
        }
        setListState(!listState)
    }

    const handleClickUpdate = () => {
        setIsButtonDisabled(true);
    
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 15000);
      };

    const handleListUpdate = () => {
        switch (propsList) {
            case 'patients': dispatch(fetchInfoPatients()); break;
            case 'doctors' : dispatch(fetchInfoDoctors()); break;
            case 'nurses' : dispatch(fetchInfoNurses()); break;
            case 'registrars' : dispatch(fetchInfoRegistrars()); break;
            default: ; break;
        }
        handleClickUpdate()
    }

    return ( 
        <>
                <div onClick={handleListPersonalOpen}>
                    {nameList}
                </div>
                <button className='list-personal__update-list' 
                        onClick={handleListUpdate}
                        disabled={isButtonDisabled}
                >
                {
                    loadingGet ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faRefresh} />
                }
                </button>
                {
                    listState ?
                    <ul className="list-personal">
                        {
                            list.map((user) => <li key={user._id}>
                                <ListPersonalItem user={user}/>
                            </li>)
                        }
                    </ul>
                    :
                    ''

                }
                
                <p>
                    {
                        errorGet
                    }
                    {
                        errorPost
                    }
                </p>
                
        </>

     );
}

export default ListPersonal;