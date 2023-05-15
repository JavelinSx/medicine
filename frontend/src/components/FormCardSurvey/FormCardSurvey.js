import {useForm} from 'react-hook-form'
import {useState} from 'react'
import { checkBoxData } from '../../utils/constant'
function FormCardSurvey() {
  // создаем состояние (state) для управления checkbox
  const [checkedItems, setCheckedItems] = useState({});

  // функция для установки состояния (state) выбранного checkbox в группе
  const handleCheckboxChange = (groupName, selectedValue) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      newCheckedItems[groupName] = selectedValue;
      return newCheckedItems;
    });
  };

  return (
    <div>
      {/* создаем форму с группами checkbox */}
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
    </div>
  );
}

export default FormCardSurvey;