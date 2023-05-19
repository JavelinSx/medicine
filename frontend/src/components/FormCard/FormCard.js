import { useState, useEffect, useDebugValue } from 'react';
import {useForm, Controller} from 'react-hook-form'
import {  useSelector, useDispatch } from 'react-redux';
import {fetchUpdateCard} from '../../ducks/usersUpdate'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import FormCardSurvey from '../FormCardSurvey/FormCardSurvey';
import './FormCard.css'
function FormCard() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.popupInteractionUser)
    const {card} = useSelector((state) => state.card)
    const [surveyData, setSurveyData] = useState({})
    const [validSurvey, setValidSurvey] = useState(false)
    const dateVisit = card?.dateVisit ? new Date(card?.dateVisit) : new Date()
    const {register, handleSubmit, formState: { errors, isValid }, control, setError} = useForm({
        mode: 'onBlur',
        defaultValues:{
            dateVisit: dateVisit,
            markerCA: card?.markerCA || '',
            symptoms: card?.symptoms || '',
            comments: card?.comments || '',
            fileMRT: null,
            fileKT: null,
        }
    })
    
    const handleFormCardSurveySubmit = (surveyData) => {
        setSurveyData(surveyData)
        setValidSurvey(true)
    };

    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        Object.keys(data).map((key) => {
            formData.append(key, data[key])
            console.log(key, data[key])
        })
        Object.keys(surveyData).map((key) => formData.append(key, surveyData[key]))
        formData.append('cardId', card._id)
        formData.append('patientId', user._id)

        dispatch(fetchUpdateCard(formData))
    };

    const handleFileChange = (event) => {

        const file = event.target.files[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
        if(!allowedTypes.includes(file.type)){
            setError(event.target.name, {
                type: 'invalidFileType',
                message: 'Разрешены только файлы типа JPG, PNG и PDF'
            })
            return
        }
        const maxSizeInBytes = 2 * 1024 * 1024;
        if(file.size > maxSizeInBytes){
            setError(event.target.name, {
                type: 'fileSizeExceeded',
                message: 'Файл слишком большой. Максимальный размер: 2 МБ'
            })
            return
        }
    }

    const checkForm = () => {
        if(isValid){
            return !validSurvey
        }else return true
    }

    return (
        <div >
            <form className='form-card' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Controller
                    name='dateVisit'
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => (
                        <DatePicker
                            required
                            value={field.value}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                    
                />
                <input {...register('markerCA', {required: true})} placeholder='Маркер СА'/>
                <textarea {...register('symptoms')} placeholder='Симптомы' />
                <textarea {...register('comments')} placeholder='Комментарии для врача' />
                <input 
                    {...register('fileMRT')} 
                    type='file' 
                    placeholder='МРТ' 
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={handleFileChange}
                /> 
                    {errors.fileMRT && (
                        <span>
                            {errors.fileMRT.message}
                        </span>
                    )}
                <input 
                    {...register('fileKT')} 
                    type='file' 
                    placeholder='КТ' 
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={handleFileChange}
                /> 
                    {errors.fileKT && (
                        <span>
                            {errors.fileKT.message}
                        </span>
                    )}
                <FormCardSurvey onSubmit={handleFormCardSurveySubmit}/>
                {errors && <span></span>}
                <button type="submit" disabled={checkForm()}>Сохранить</button>
            </form>
        </div>
    );
}

export default FormCard;