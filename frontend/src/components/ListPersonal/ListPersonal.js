import { useState } from 'react'
import ListPersonalItem from "../ListPersonalItem/ListPersonalItem";
import FormCreatePersonal from '../FormCreatePersonal/FormCreatePersonal';
import FormCreateUser from '../FormCreateUser/FormCreateUser';

function ListPersonal({ nameList, roleList, list, listState, toggleListUser, updateList }) {
  const [createState, setCreateState] = useState(false)
  const [viewListState, setViewListState] = useState(false)

  const toggleCreateUser = () => {
    setCreateState(!createState)
  }

  const toggleListView = () => {
    setViewListState(!viewListState)
  }

  const getFormCreate = () => {
    return (
      <>
        {
          roleList === 'patient' ? <FormCreateUser roleList={roleList} /> : <FormCreatePersonal roleList={roleList} />
        }
      </>
    )
  }

  return (
    <>
      <div className='list-personal__container'>

        <h3 className='list-personal__title' onClick={toggleListUser}>
          {nameList}
        </h3>


        {
          listState ?
            <>
              <button className='button list-personal__button' onClick={updateList}>Обновить список</button>
              <button className='button list-personal__button' onClick={toggleCreateUser}>Создать пользователя</button>
              {
                createState ?
                  getFormCreate()
                  :
                  ''
              }
              <button className='button list-personal__button' onClick={toggleListView}>Список пользователей</button>
              {
                viewListState ?
                  <ul className="list-personal__list-user">
                    {
                      list.map((user) => <li key={user._id}>
                        <ListPersonalItem user={user} />
                      </li>)
                    }
                  </ul>
                  :
                  null
              }

            </>
            :
            null
        }
      </div>
    </>
  );
}

export default ListPersonal;