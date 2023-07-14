import { useMemo, useState, useEffect } from 'react'
import ListPersonalItem from "../ListPersonalItem/ListPersonalItem";
import FormCreatePersonal from '../FormCreatePersonal/FormCreatePersonal';
import FormCreateUser from '../FormCreateUser/FormCreateUser';
import InputText from '../InputText/InputText';

function ListPersonal({ nameList, roleList, list, listState, toggleListUser }) {
  const [createState, setCreateState] = useState(false)
  const [viewListState, setViewListState] = useState(false)
  const [viewList, setViewList] = useState([])
  const [lengthList, setLengthList] = useState(5)
  const [viewButtonMore, setViewButtonMore] = useState(false)

  useMemo(() => {
    setViewList(list.slice(0, lengthList));
    if (lengthList < list.length) {
      setViewButtonMore(true);
    } else {
      setViewButtonMore(false);
    }
  }, [list, lengthList]);


  const toggleCreateUser = () => {
    setCreateState(!createState)
  }

  const toggleListView = () => {
    setViewListState(!viewListState)
    setLengthList(5)
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

  const getFormSearch = () => {
    return (
      <>
        {
          roleList === 'patient' ?
            <>
              <input className='input input-search' name='search' autoComplete='off' onKeyDown={handleSearchKeyDown} placeholder='Поиск'></input>
              <button className='button button-search' type='button' onClick={handleSearch}>Найти</button>
              <button className='button button-search' type='button' onClick={handleSearchReset}>Сбросить поиск</button>
            </>
            : <></>
        }
      </>
    )
  }

  const handleListIncrease = () => {
    if (lengthList < list.length) {
      setLengthList(state => state + 5)
    }
  }

  const handleSearch = () => {
    const inputSearch = document.querySelector('.input-search')
    const value = inputSearch.value.toLowerCase()
    const result = list.filter((patient) => {
      const searchValueName = patient.name.toLowerCase()
      const searchValueSurName = patient.surName.toLowerCase()
      const searchValueMiddleName = patient.middleName.toLowerCase()
      return searchValueName.includes(value) || searchValueSurName.includes(value) || searchValueMiddleName.includes(value)
    })
    setViewList(result.slice(0, lengthList))
  }

  const handleSearchKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }

  const handleSearchReset = () => {
    const inputSearch = document.querySelector('.input-search')
    inputSearch.value = ''

    setViewList(list)
    setLengthList(5)

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
                  <div className='list-personal__list-container'>
                    {
                      getFormSearch()
                    }
                    <ul className="list-personal__list-user">
                      {
                        viewList?.length === 0 ? <span className='list-personal__empty'>Пользователей не создано</span>
                          :
                          viewList?.map((user) => <li className='list-personal__item' key={user._id}> <ListPersonalItem user={user} /> </li>)
                      }
                    </ul>
                    {
                      viewButtonMore ? <button className='button list-personal__button-more' onClick={handleListIncrease}>Показать ещё</button> : null
                    }

                  </div>
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