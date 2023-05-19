import React, { useState } from 'react';
import { checkBoxData } from '../../utils/constant';

function FormCardSurvey({ onSubmit }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [error, setError] = useState('');
  const [focusRangeCheck, setFocusRangeCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [valueRange, setValueRange] = useState(50);

  const handleCheckboxChange = (groupName, selectedValue) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      if (newCheckedItems[groupName] === selectedValue) {
        delete newCheckedItems[groupName];
      } else {
        newCheckedItems[groupName] = selectedValue;
      }
      return newCheckedItems;
    });
  };

  const handleCheckForm = () => {
    const isValid = Object.keys(checkedItems).length === checkBoxData.length;

    if (isValid && focusRangeCheck) {
      const selectedValues = checkBoxData.reduce((result, group) => {
        const selectedBox = group.boxes.findIndex(
          (box) => checkedItems[group.nameGroup] === Object.values(box)[0]
        );
        result.push(selectedBox + 1);
        return result;
      }, []);

      setError('');
      setIsOpen(false);

      const formData = {
        resultForm: selectedValues,
        healthScore: valueRange,
      };

      onSubmit(formData); // Вызов функции обратного вызова с данными формы
    } else {
      setError('Выберите хотя бы один checkbox в каждой группе');
      if (!focusRangeCheck) {
        setError('Выберите значение в шкале');
      }
    }
  };

  const openSurvey = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeRange = (event) => {
    setValueRange(event.target.value);
    setFocusRangeCheck(true);
  };

  const handleChangeRangeInput = (event) => {
    setValueRange(event.target.value);
    setFocusRangeCheck(true);
  };

  return (
    <>
      <button type='button' onClick={openSurvey}>Заполнить анкету</button>
      {isOpen &&
        <div>
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
                        onChange={() => handleCheckboxChange(group.nameGroup, boxValue)}
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
          <button type="button" onClick={handleCheckForm}>Сохранить</button>
        </div>
      }
    </>
  );
}

export default FormCardSurvey;
