import {useForm, Controller} from 'react-hook-form'
import DatePicker from 'react-date-picker';
import {useState} from 'react'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
function DatePickerControler({initialValue}) {
    const {register, handleSubmit, formState: { errors }, control} = useForm({ mode: 'onBlur',defaultValues: {birthDay: initialValue}})
    const date = new Intl.DateTimeFormat('ru-RU').format(new Date(initialValue || null))
    const [selectedDate, setSelectedDate] = useState(date);

    
    console.log(date)
    return ( 
        <>
            <Controller
                    as={DatePicker}
                    control={control}
                    valueName="selected"
                    onChange={([selected]) => selected}
                    name="birthDay"
                    className="input"
                    placeholderText="Select date"
                    render={({ field: { onChange } }) => (
                        <DatePicker
                        
                          onChange={(date) => {
                            setSelectedDate(date);
                            onChange(date);
                          }}
                          value={selectedDate}

                        />
                    )}
            />
        </>
     );
}

export default DatePickerControler;