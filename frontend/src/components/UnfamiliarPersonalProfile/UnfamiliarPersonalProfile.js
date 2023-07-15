import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form'
import { fetchUpdateUser } from '../../ducks/usersUpdate'
import SubmitButton from '../SubmitButton/SubmitButton';
import InputText from '../InputText/InputText';
import { patternInputTextRu } from '../../utils/constant'
function UnfamiliarPersonalProfile() {

    const [successfullyCreateMessage, setSuccessfullyCreateMessage] = useState(false)
    const [errorViewServerMessage, setErrorViewServerMessage] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { user } = useSelector((state) => state.popupInteractionUser)
    const { updatedUser } = useSelector((state) => state.usersUpdate)
    const { errorPost } = useSelector((state) => state.usersPost)

    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (updatedUser) {
            Object.entries(updatedUser).forEach(([fieldName, value]) => {
                setValue(fieldName, value);
            })
        }
        setFormSubmitted(false)
    }, [updatedUser])

    const onSubmit = async (data) => {
        try {
            await dispatch(fetchUpdateUser({
                updatedData: data,
                updatedUser: user
            }))

            if (errorPost) {
                setErrorViewServerMessage(true)
                setTimeout(() => {
                    setErrorViewServerMessage(false)
                }, 5000)
            } else {
                setSuccessfullyCreateMessage(true)
                setTimeout(() => {
                    setSuccessfullyCreateMessage(false)
                }, 5000)
            }

        } catch (error) {

        }

    };

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='personal-profile'>
            <div className='personal-profile__header'>
                <button className='button' onClick={handleGoBack}>Назад</button>
            </div>
            <div className='personal-profile__container'>
                <FormProvider {...{ register, handleSubmit, formState: { errors }, control, watch, setValue, getValues }}>
                    <form className='personal-profile__form' onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            name='surName'
                            label='Фамилия'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Пожалуйста, введите фамилию, используя только русские буквы'}
                            patternRule={patternInputTextRu}
                            type='text'
                        />
                        <InputText
                            name='name'
                            label='Имя'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Пожалуйста, введите имя, используя только русские буквы'}
                            patternRule={patternInputTextRu}
                            type='text'
                        />
                        <InputText
                            name='middleName'
                            label='Отчество'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Пожалуйста, введите отчество, используя только русские буквы'}
                            patternRule={patternInputTextRu}
                            type='text'
                        />

                        <SubmitButton
                            data={updatedUser}
                            formSubmitted={formSubmitted}
                            onSubmit={onSubmit}
                            classNamePrefix=''
                            textButton='Изменить'
                        />
                        {
                            errorViewServerMessage ? <span className='error'>{errorPost}</span> : null
                        }
                        {
                            successfullyCreateMessage ? <span className='complete-message'>Профиль успешно изменён</span> : null
                        }
                    </form>
                </FormProvider>

            </div>
        </div>

    );
}

export default UnfamiliarPersonalProfile;