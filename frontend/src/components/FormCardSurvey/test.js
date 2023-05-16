import {appendErrors, useForm} from 'react-hook-form'
import {useState} from 'react'
import { checkBoxData } from '../../utils/constant'
function FormCardSurvey() {
  // создаем состояние (state) для управления checkbox
  const [checkedItems, setCheckedItems] = useState({});

  const {register, handleSubmit, errors} = useForm({})

  const onSubmit = () => {

      // проверяем, что в каждой группе есть активный checkbox
      const isValid = Object.keys(checkedItems).length === checkBoxData.length;
  
      if (isValid) {
        // получаем массив выбранных значений по группам
        const selectedValues = checkBoxData.reduce((result, group) => {
          const selectedBox = group.boxes.findIndex(
            (box) => checkedItems[group.nameGroup] === Object.values(box)[0]
          );
          result.push(selectedBox + 1); // индексы начинаются с 1
          return result;
        }, []);
  
        console.log(selectedValues); // выводим в консоль выбранные значения
        return selectedValues
      } else {
        console.log('Выберите хотя бы один checkbox в каждой группе');
        errors = 'false'
      }

  };


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
      // console.log(newCheckedItems)
      // console.log(newCheckedItems[groupName])
      return newCheckedItems;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {checkBoxData.map((group) => (
        <div key={group.nameGroup}>
          <h3>{group.nameGroup}</h3>
          {group.boxes.map((box) => {
            const boxKey = Object.keys(box)[0];
            const boxValue = Object.values(box)[0];
            const isChecked = checkedItems[group.nameGroup] === boxValue;
            // console.log(boxValue)
            // console.log(isChecked)
            // console.log(checkedItems)
            return (
              <div key={boxKey}>
                <label>
                  <input
                    {...register(boxKey)}
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
      {errors && <span>В каждой группе должен быть выбран один пункт</span>}
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default FormCardSurvey;