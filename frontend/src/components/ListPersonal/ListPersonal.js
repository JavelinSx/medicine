import './ListPeronsonal.css'
import {useState} from 'react'
import ListPersonalItem from "../ListPersonalItem/ListPersonalItem";
import FormPersonalCreate from '../FormPersonalCreate/FormPersonalCreate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import FormCreatePersonal from '../FormCreatePersonal/FormCreatePersonal';
import FormCreateUser from '../FormCreateUser/FormCreateUser';
function ListPersonal({nameList, roleList, list, listState, toggleListUser, updateList}) {
  const [createState, setCreateState] = useState(false)

  const toggleCreateUser = () => {
      setCreateState(!createState)
  }
  const getFormCreate = () => {
    return(
      <>
        {
          roleList==='patient' ? <FormCreateUser roleList={roleList} /> : <FormCreatePersonal roleList={roleList} />
        }
      </>
    )
  }

  return ( 
      <>
              <div>
                <div onClick={toggleListUser}>
                    {nameList}
                </div>
                <button onClick={updateList}>
                  <FontAwesomeIcon icon={faRefresh} />
                </button>
              </div>

              {
                  listState ?
                  <>
                      
                      <ul className="list-personal">
                        <button type='button' onClick={toggleCreateUser}>Создать пользователя</button>
                        {
                            createState ? 
                            getFormCreate()
                            :
                            ''
                        }
                        {
                            list.map((user) => <li key={user._id}>
                                <ListPersonalItem user={user}/>
                            </li>)
                        }
                      </ul>
                  </>
                  :
                  ''
              }
      </>
    );
}

export default ListPersonal;