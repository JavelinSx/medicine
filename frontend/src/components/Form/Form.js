import React from 'react';
import DatePicker from 'react-date-picker';
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { checkBoxData } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdateCard, fetchGetAllCards, fetchGetCardFile } from '../../ducks/cards';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
import { convertBlobToFile } from '../../utils/convertBlobToFile';
import MySelectComponent from '../MySelectComponent/MySelectComponent'

const Form = () => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { card, cardFiles } = useSelector((state) => state.cards);
  const { userAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // Состояние для отслеживания выбранного checkbox в каждой группе
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [errorsFiles, setErrorsFiles] = useState({})
  const healthScore = useWatch({ control, name: 'healthScore', defaultValue: card.healthScore });

  useEffect(() => {
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
        setError('error', ' hello')
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

    Object.keys(data).forEach((key) => {

      if (typeof data[key] === 'string' && data[key].includes('blob')) {
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
    <form className='form' onSubmit={handleSubmit(onSubmit)} >
      {

        userAuth.role !== 'patient' ?
          <div className='form__container'>
            <label className='form__label'>Статус карточки</label>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <MySelectComponent
                  {...field}
                  defaultValue={card.status}
                  optionsProps={
                    [
                      { value: 'new', label: 'Пустая' },
                      { value: 'updated', label: 'Частично заполненная' },
                      { value: 'confirmed', label: 'Подтверждённая и закрытая' },
                    ]
                  }
                />
              )}
            />
          </div>
          :
          null
      }

      <div className='form__container'>
        <label className='form__label'>Дата визита</label>
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

      <div className='form__container'>
        <label className='form__label'>Онкомаркер СА-125</label>
        <input
          className='input form__input'
          type="number"
          {...register('markerCA')}
        />
      </div>

      <div className='form__container form__textarea'>
        <label className='form__label'>Симптомы</label>
        <textarea
          className='input form__input form__textarea'
          {...register('symptoms')}
        />
      </div>

      <div className='form__container form__textarea'>
        <label className='form__label'>Комментарии для врача</label>
        <textarea
          className='input form__input form__textarea'
          {...register('comments')}
        />
      </div>

      <div className='form__container form__file'>
        <label className='form__label'>Файл МРТ</label>

        <Controller
          name="fileMRT"
          control={control}
          rules={{ validate: validateFile }}
          render={({ field }) => (
            <ButtonLoader file={card.previewFileMRT} validationFunction={validateFile} handleFile={file => field.onChange(file)} />

          )}
        />
        {errors.fileMRT && <span>{errors.fileMRT.message}</span>}
      </div>

      <div className='form__container form__file'>
        <label className='form__label'>Файл КТ</label>

        <Controller
          name="fileKT"
          control={control}
          rules={{ validate: validateFile }}
          render={({ field }) => (
            <ButtonLoader file={card.previewFileKT} validationFunction={validateFile} handleFile={file => field.onChange(file)} />

          )}
        />
        {errors.fileKT && <span>{errors.fileKT.message}</span>}
      </div>

      <div className='form__checkboxs-wrapper'>
        <h2 className='form__label-survey'> Анкета здоровья </h2>
        <ul className='form__checkboxs'>
          {checkBoxData.map((group, groupIndex) => (
            <li className='form__checkboxs-item' key={groupIndex}>
              <h4 className='form__checkboxs-title'>{group.nameGroup}</h4>
              {group.boxes.map((box, checkboxIndex) => (
                <div className='form__checkboxs-wrapper-input' key={checkboxIndex}>
                  <input
                    className='form__checkboxs-input'
                    id={`checkbox-${groupIndex}-${checkboxIndex}`}
                    type="checkbox"
                    name={`resultForm[${groupIndex}]`}
                    value={checkboxIndex}
                    onChange={() => handleCheckboxChange(groupIndex, checkboxIndex)}
                    checked={selectedCheckboxes[groupIndex] === checkboxIndex}
                  />
                  <label className='form__checkboxs-label' htmlFor={`checkbox-${groupIndex}-${checkboxIndex}`}>{Object.values(box)[0]}</label>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>


      <div className='form__container-range'>
        <div className='form__container form__range'>
          <label className='form__range-title'>Шкала здоровья</label>
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
          <div className='form__number-range-view'>
            <span className='form__number-range-value'>0</span>

            <span className='form__number-range-value'>50</span>

            <span className='form__number-range-value'>100</span>
          </div>
        </div>

        <div className='form__container form__range-number'>
          <label className='form__range-title'>Ваши очки здоровья: </label>
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
      </div>

      <div>
        <button
          className='button form__button'
          type="submit"
          disabled={(userAuth.role === 'patient' && card.status === 'confirmed') || Object.values(errorsFiles)[0]?.length > 0 ? 'disabled' : undefined}
        > {
            (userAuth.role === 'patient' && card.status === 'confirmed') ?
              <span>Карточка подтверждена врачом и закрыта</span>
              :
              'Сохранить данные карточки'
          }
        </button>
      </div>
    </form>
  );
};

export default Form;
