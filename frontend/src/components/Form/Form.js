import React from 'react';
import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch, FormProvider } from 'react-hook-form';
import { checkBoxData } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdateCard, fetchGetAllCards, fetchDeleteCard } from '../../ducks/cards';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
import { convertBlobToFile } from '../../utils/convertBlobToFile';
import MySelectComponent from '../MySelectComponent/MySelectComponent'
import { openPopup } from '../../ducks/popupInteractionUser';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const Form = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [waitUpdateCard, setWaitUpdateCard] = useState(false)
  const { user } = useSelector((state) => state.popupInteractionUser)

  const { register, control, handleSubmit, formState: { errors }, setValue, watch, setError, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { card } = useSelector((state) => state.cards);
  const { userAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // Состояние для отслеживания выбранного checkbox в каждой группе

  const healthScore = useWatch({ control, name: 'healthScore', defaultValue: card.healthScore });

  useEffect(() => {
    if (card) {

      Object.entries(card).forEach(([fieldName, value]) => {
        if (fieldName === 'markerCA') {
          value = 0
        }
        setValue(fieldName, value);
      });
      setSelectedCheckboxes(card.resultForm)
    }
  }, [card, setValue]);

  // Валидация файлов по расширению
  const validateFile = (value) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 мегабайт

    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        const fileExtension = value[i].name.split('.').pop();
        const fileSize = value[i].size;

        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
        }

        if (fileSize > maxSizeInBytes) {
          return 'Превышен максимальный размер файла. Максимальный размер: 5 МБ';
        }
      }
    } else if (value instanceof Blob) {
      const fileExtension = value.name.split('.').pop();
      const fileSize = value.size;

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
      }

      if (fileSize > maxSizeInBytes) {
        return 'Превышен максимальный размер файла. Максимальный размер: 5 МБ';
      }
    } else if (value instanceof File) {
      const fileExtension = value.name.split('.').pop();
      const fileSize = value.size;

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        return 'Неподдерживаемый тип файла. Используйте: .jpg, .jpeg, .png';
      }

      if (fileSize > maxSizeInBytes) {
        return 'Превышен максимальный размер файла. Максимальный размер: 5 МБ';
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
    setWaitUpdateCard(true)

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
          .then((payload) => payload.type.includes('fulfilled') ? setTimeout(() => setWaitUpdateCard(false), 2000) : '')
          .then(() => userAuth.role !== 'patient' ? dispatch(fetchGetAllCards()) : null)
      })

      .catch((error) => {
        console.log(error)
      });

  };

  return (
    <>
      <div className={`form-blur ${waitUpdateCard ? 'show-form-blur' : 'hide-form-blur'}`}></div>
      <FormProvider {...{ register, handleSubmit, formState: { errors }, control, watch, setValue, getValues }} >
        <form className='form' onSubmit={handleSubmit(onSubmit)} >

          {

            userAuth.role !== 'patient' ?
              <div className='form__container'>
                <label className='form__label'>Статус карточки</label>

                <MySelectComponent
                  name='status'
                  defaultValue={card.status}
                  optionsProps={
                    [
                      { value: 'new', label: 'Новая' },
                      { value: 'updated', label: 'Частично заполненная' },
                      { value: 'confirmed', label: 'Подтверждённая и закрытая' },
                    ]
                  }

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
              className='button form__button button__save'
              type="submit"
              disabled={(userAuth.role === 'patient' && card.status === 'confirmed') ? 'disabled' : undefined}
            > {
                (userAuth.role === 'patient' && card.status === 'confirmed') ?
                  <span>Карточка подтверждена врачом и закрыта</span>
                  :
                  'Сохранить данные карточки'
              }
            </button>
            {
              userAuth.role !== 'patient' ? <button className='button button__delete' type='button' onClick={() => {
                dispatch(openPopup({
                  text: `Вы хотите удалить карточку пациента?`,
                  purpose: 'delete-card',
                  user: user,
                  cardId: card._id,
                }))
              }}>Удалить карточку</button> : ''
            }
          </div>
        </form>
      </FormProvider>

    </>

  );
};

export default Form;
