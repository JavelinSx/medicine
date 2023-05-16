import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useCallback } from 'react';
import { checkBoxData } from '../../utils/constant'; // импортируем исходные данные

function FormCardSurvey() {
  // создаем состояние (state) для управления checkbox
  const [checkedItems, setCheckedItems] = useState({});
  const [error, setError] = useState('')
  const [focusRangeCheck, setFocusRangeCheck] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [valueRange, setValueRange] = useState(50);
  // функция для установки состояния (state) выбранного checkbox в группе
  const handleCheckboxChange = (groupName, selectedValue) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      if (newCheckedItems[groupName] === selectedValue) {
        // Если выбранный checkbox уже активен, снимаем флажок
        delete newCheckedItems[groupName];
      } else {
        newCheckedItems[groupName] = selectedValue;
      }
      return newCheckedItems;
    });
  };

  // функция для обработки отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();

    // проверяем, что в каждой группе есть активный checkbox
    const isValid = Object.keys(checkedItems).length === checkBoxData.length;

    if (isValid && focusRangeCheck) {
      // получаем массив выбранных значений по группам
      const selectedValues = checkBoxData.reduce((result, group) => {
        const selectedBox = group.boxes.findIndex(
          (box) => checkedItems[group.nameGroup] === Object.values(box)[0]
        );
        result.push(selectedBox + 1); // индексы начинаются с 1
        return result;
      }, []);
      setError('')
      setIsOpen(false)
      return {
        resultForm: selectedValues,
        healthScore: valueRange
      }
    } else {
      setError('Выберите хотя бы один checkbox в каждой группе')
      if(!focusRangeCheck){
        setError('Выберите значение в шкале')
      }
    }
    
  };

  const openSurvey = () => {
    setIsOpen(!isOpen)
  }

  const handleChangeRange = useCallback((event) => {
    setValueRange(event.target.value);
    setFocusRangeCheck(true)
  },[])
  const handleChangeRangeInput = useCallback((event) => {
    setValueRange(event.target.value);
    setFocusRangeCheck(true)
  },[])

  return (
    <>
      <button type='button' onClick={openSurvey}>Заполнить анкету</button>
      {
        isOpen ? 
        <div>
          <form onSubmit={handleSubmit}>
            {checkBoxData.map((group) => (
              <div key={group.nameGroup}>
                <h3>{group.nameGroup}</h3>
                {group.boxes.map((box) => {
                  const boxKey = Object.keys(box)[0];
                  const boxValue = Object.values(box)[0];
                  const isChecked = checkedItems[group.nameGroup] === boxValue;

                  return (
                    <div key={boxKey}>
                      <label>
                        <input
                          type="checkbox"
                          value={boxValue}
                          checked={isChecked}
                          onChange={() =>
                            handleCheckboxChange(group.nameGroup, boxValue)
                          }
                        />
                        {boxValue}
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}
            <input type='range' min={1} max={100} step={1} onChange={handleChangeRange} value={valueRange}></input>
            <input type='number' min={1} max={100} value={valueRange} onChange={handleChangeRangeInput}></input>
            {error && <span>{error}</span>}
            <button type="submit">Сохранить</button>
          </form>
        </div>
        :
        ''
      }
      
    </>

  );
}

export default FormCardSurvey;
