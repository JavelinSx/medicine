import {useForm, Controller} from 'react-hook-form'
import DatePicker from 'react-date-picker';
import {dateSend} from '../../utils/dateParsing'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import FormCardSurvey from '../FormCardSurvey/FormCardSurvey';
function FormCard() {

    const {register, handleSubmit, formState: { errors }, control, setError} = useForm({
        mode: 'onBlur',
        defaultValues:{

        }
    })

    const onSubmit = (data) => {
        console.log(data)
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
        console.log('hello')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='dayVisit'
                    control={control}

                    render={({ field }) => (
                        <DatePicker
                            required
                            value={field.value}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                    
                />
                <input {...register('markerCA')} placeholder='Маркер СА' required/>
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
                <FormCardSurvey />
                {errors && <span>This field is required</span>}
                {console.log(Object.keys(errors))}
                <button type="submit" disabled={Object.keys(errors).length!==0}>Сохранить</button>
            </form>
        </div>
    );
}

export default FormCard;