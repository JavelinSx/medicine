import React from 'react';
import DatePicker from 'react-date-picker';
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { checkBoxData } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdateCard, fetchGetAllCards, fetchGetCardFile } from '../../ducks/cards';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
import { convertBlobToFile } from '../../utils/convertBlobToFile';
import './Form.css'

const Form = () => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting  }, setValue, watch, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { card } = useSelector((state) => state.cards);
  const { userAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // Состояние для отслеживания выбранного checkbox в каждой группе
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const healthScore = useWatch({control, name: 'healthScore', defaultValue: card.healthScore });

  useEffect(() => {
    console.log(card)
    if (card) {
      Object.entries(card).forEach(([fieldName, value]) => {
        setValue(fieldName, value);
      });
      setSelectedCheckboxes(card.resultForm)
    }
  }, [card, setValue]);

  // Валидация файлов по расширению
  const validateFile = (value) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            const fileExtension = value[i].name.split('.').pop();

            if (!allowedExtensions.includes(`.${fileExtension}`)) {
              return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
            }
          }
        } else if (value instanceof Blob) {
          
          const fileExtension = value.name.split('.').pop();
          if (!allowedExtensions.includes(`.${fileExtension}`)) {
            setError('error',' hello')
            return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
          }
        } else if (value instanceof File) {
          const fileExtension = value.name.split('.').pop();
  
          if (!allowedExtensions.includes(`.${fileExtension}`)) {
            return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
          }
        } 
  };

  // Обработчик изменений checkbox в группе
  const handleCheckboxChange = (groupIndex, checkboxIndex) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const updatedCheckboxes = [...prevSelectedCheckboxes];
      updatedCheckboxes[groupIndex] = checkboxIndex;
      return updatedCheckboxes;
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData()

    data = {
      ...data,
      
      resultForm: selectedCheckboxes
    }

    const filePromises = [];
    //здесь необходима логика преобразования blob в File,
    // для случая, если пользователь загрузил свою карточку
    // и либо изменил одну из картинок, либо не изменял их вовсе
    // тогда на вход FormData будет поуступать blob(так как присутствует предварительный просмотр),
    // который мы должны конвертировать в File, для успешной обработки на сервере.
    Object.keys(data).forEach((key) => {
      
      if ( typeof data[key] === 'string' && data[key].includes('blob')) {
        console.log(key, data[key])
        const blobUrl = data[key];
        const filePromise = convertBlobToFile(blobUrl); // Преобразование Blob в File
        filePromises.push(filePromise);
        filePromise.then((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    Promise.all(filePromises)
      .then(() => {
        formData.delete('previewFileMRT')
        formData.delete('previewFileKT')
        dispatch(fetchUpdateCard(formData))
      })
      // .then(() =>
      //   dispatch(
      //     fetchGetCardFile({
      //       cardId: data._id,
      //       patientId: data.patientId,
      //     })
      //   )
      // )
      .then(() => dispatch(fetchGetAllCards()))
      .catch((error) => {
        console.log(error)
      });

    };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} disabled='disabled'>
      {
        userAuth.role!=='patient' ? 
        <div>
          <select {...register('status')}>
              <option value="new">Пустая</option>
              <option value="updated">Частично заполненная</option>
              <option value="confirmed">Подтверждённая и закрытая</option>
          </select>
        </div>
        :
        null
      }

      <div>
        <Controller
          name="dateVisit"
          control={control}
          render={({ field }) => (
            <DatePicker
              required
              value={field.value || new Date()}
              onChange={(date) => field.onChange(date)}
            />
            
          )}
        />
      </div>

      <div>
        <label>Маркер CA:</label>
        <input
          type="number"
          name="markerCA"
          {...register('markerCA')}

        />
      </div>

      <div>
        <label>Симптомы:</label>
        <textarea
          name="symptoms"
          {...register('symptoms')}
        />
      </div>

      <div>
        <label>Ваши комментарии:</label>
        <textarea
          name="comments"
          {...register('comments')}
        />
      </div>

      <div>
        <label>Файл МРТ: </label>
        <Controller
            name="fileMRT"
            control={control}
            rules={{validate: validateFile}}
            render={({ field }) => (
              <ButtonLoader file={card.previewFileMRT} validationFunction={validateFile} handleFile={file => field.onChange(file)} />
              
            )}
        />
        {errors.fileMRT && <span>{errors.fileMRT.message}</span>}
      </div>

      <div>
        <label>Файл КТ: </label>
        <Controller
            name="fileKT"
            control={control}
            rules={{validate: validateFile}}
            render={({ field }) => (
              <ButtonLoader file={card.previewFileKT} validationFunction={validateFile} handleFile={file => field.onChange(file)} />
              
            )}
        />
        {errors.fileKT && <span>{errors.fileKT.message}</span>}
      </div>

      {checkBoxData.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3>{group.nameGroup}</h3>
          {group.boxes.map((box, checkboxIndex) => (
            <div key={checkboxIndex}>
              <input
                id={`checkbox-${groupIndex}-${checkboxIndex}`}
                type="checkbox"
                name={`resultForm[${groupIndex}]`}
                value={checkboxIndex}
                onChange={() => handleCheckboxChange(groupIndex, checkboxIndex)}
                checked={selectedCheckboxes[groupIndex] === checkboxIndex}
              />
              <label htmlFor={`checkbox-${groupIndex}-${checkboxIndex}`}>{Object.values(box)[0]}</label>
            </div>
          ))}
          {errors.resultForm &&
            errors.resultForm[groupIndex] &&
            errors.resultForm[groupIndex].type === 'validate' && (
              <span>Выберите хотябы один пункт из группы</span>
            )}
        </div>
      ))}

      <div>
        <label>Шкала здоровья:</label>
        <input
          {...register('healthScore')}
          className='form__input-range'
          type="range"
          min="0"
          max="100"
          value={healthScore}
          onChange={(e) => {
            setValue('healthScore', e.target.value);
          }}
        />
      </div>

      <div>
        <label>Ваши очки здоровья:</label>
        <input
          {...register('healthScore')}
          type="number"
          min="0"
          max="100"
          value={healthScore}
          onChange={(e) => {
            setValue('healthScore', e.target.value);
          }}
        />
      </div>

      <div>
        {
          (userAuth.role==='patient' && card.status==='confirmed') ? 
          <span>Карточка подтверждена врачом и закрыта</span>
          :
          null
        }
        
        <button type="submit" disabled={(userAuth.role==='patient' && card.status==='confirmed') ? 'disabled' : undefined}>Сохранить данные карточки</button>
      </div>
    </form>
  );
};

export default Form;
