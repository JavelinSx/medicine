import {useForm} from 'react-hook-form'
import {useState} from 'react'
import { checkBoxData } from '../../utils/constant'
function FormCardSurvey() {

    const [mobilityState, setMobilityState] = useState(false)
    const [selfCareState, setSelfCareState] = useState(false)
    const [activityState, setActivityState] = useState(false)
    const [painState, setPainState] = useState(false)
    const [depressionState, setВepressionState] = useState(false)

    const {register, handleSubmit, formState: { errors }, control} = useForm({
        mode: 'onBlur',
        defaultValues:{

        }
    })

    const onSubmit = (data) => {

    };

    const checkMobilityState = (event) => {
        console.log(event.target)
    }

    const checkboxes = () => {
        return  checkBoxData.map((group) => 
                <>
                    <p>{group.nameGroup}</p>

                        {group.boxes.map((checkbox, index) => {
                            const nameCheckBox = Object.keys(checkbox)[0]
                            const textCheckBox = Object.values(checkbox)[0]
                            return  <>
                                        <label htmlFor={nameCheckBox} onClick={checkMobilityState}>{textCheckBox}</label>
                                        <input {...register(nameCheckBox)} id={nameCheckBox} type='checkbox' onChange={checkMobilityState} key={index}/>
                                    </>
                        })}
                </>

            )
        
    }

    return ( 
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    checkboxes()
                }
                {/* <div>
                    <p>Подвижность</p>
                    <label>
                        Я не испытываю трудностей при ходьбе
                        <input {...register('mobilityQuestion-1')} type='checkbox' onChange={checkMobilityState}/> 
                    </label>
                    <label>
                        Я испытываю некоторые трудности при ходьбе
                        <input {...register('mobilityQuestion-2')} type='checkbox' onChange={checkMobilityState}/>
                    </label>
                    <label>
                        Я прикован (-а) к постели 
                        <input {...register('mobilityQuestion-3')} type='checkbox' onChange={checkMobilityState}/>
                    </label>      
                </div>
                <div>
                    <p>Уход за собой</p>
                    <label>
                        Я не испытываю трудностей при уходе за собой
                        <input {...register('selfCareQuestion-1')} type='checkbox'/> 
                    </label>
                    <label>
                        Я испытываю некоторые трудности с мытьем или одеванием
                        <input {...register('selfCareQuestion-2')} type='checkbox'/>
                    </label>
                    <label>
                        Я не в состоянии сам (-а) мыться или одеваться 
                        <input {...register('selfCareQuestion-3')} type='checkbox'/>
                    </label>      
                </div>
                <div>
                    <p>Повседневная активность</p>
                    <label>
                        Я не испытываю трудностей в моей привычной повседневной деятельности
                        <input {...register('activityQuestion-1')} type='checkbox'/> 
                    </label>
                    <label>
                        Я испытываю некоторые трудности в моей привычной повседневной деятельности
                        <input {...register('activityQuestion-2')} type='checkbox'/>
                    </label>
                    <label>
                        Я не в состоянии заниматься своей привычной повседневной деятельностью 
                        <input {...register('activityQuestion-3')} type='checkbox'/>
                    </label>      
                </div>
                <div>
                    <p>Боль\Дискомфорт</p>
                    <label>
                        Я не испытываю боли или дискомфорта
                        <input {...register('painQuestion-1')} type='checkbox'/> 
                    </label>
                    <label>
                        Я испытываю умеренную боль или дискомфорт
                        <input {...register('painQuestion-2')} type='checkbox'/>
                    </label>
                    <label>
                        Я испытываю крайне сильную боль или дискомфорт
                        <input {...register('painQuestion-3')} type='checkbox'/>
                    </label>      
                </div>
                <div>
                    <p>Тревога\Депрессия</p>
                    <label>
                        Я не испытываю тревоги или депрессии
                        <input {...register('painQuestion-1')} type='checkbox'/> 
                    </label>
                    <label>
                        Я испытываю умеренную тревогу или депрессию
                        <input {...register('painQuestion-2')} type='checkbox'/>
                    </label>
                    <label>
                        Я испытываю крайне сильную тревогу или депрессию
                        <input {...register('painQuestion-3')} type='checkbox'/>
                    </label>      
                </div> */}
                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit">Сохранить</button>
            </form>
        </>
     );
}

export default FormCardSurvey;