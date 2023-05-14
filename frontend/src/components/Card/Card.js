import {useForm, Controller} from 'react-hook-form'
import DatePicker from 'react-date-picker';
import {dateSend} from '../../utils/dateParsing'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
function Card() {

    const {register, handleSubmit, formState: { errors }, control} = useForm({
        mode: 'onBlur',
        defaultValues:{

        }
    })

    const onSubmit = (data) => {

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='dayVisit'
                    control={control}

                    render={({ field }) => (
                        <DatePicker
                            value={field.value}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                <input {...register('markerCA')} placeholder='Маркер СА' />
                <textarea {...register('symptoms')} placeholder='Симптомы' />
                <textarea {...register('comments')} placeholder='Комментарии для врача' />
                <input {...register('comments')} type='file' placeholder='МРТ' /> 
                <input {...register('comments')} type='file' placeholder='КТ' /> 


                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit">Сохранить</button>
            </form>
        </>
    );
}

export default Card;