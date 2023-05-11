import './ListPeronsonal.css'
import {useState} from 'react'
import ListPersonalItem from "../ListPersonalItem/ListPersonalItem";
import FormPersonalCreate from '../FormPersonalCreate/FormPersonalCreate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

function ListPersonal({nameList, roleList, list, listState, toggleListUser, updateList}) {



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
                      <FormPersonalCreate roleList={roleList}/>
                      <ul className="list-personal">
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