
import { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import InputText from '../InputText/InputText';

function FormChangePassword() {

    const dispatch = useDispatch();

    const { errorUpdate } = useSelector((state) => state.usersUpdate)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    const closePopup = () => {
        dispatch()
    }


    return (

        <>
            <div className='form-change-password__container'>
                <FormProvider {...{ formState: { errors }, register }}>
                    <form className='form-change-password' onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            name='oldPassword'
                            label='Старый пароль'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Минимум 8 символов, одна или более букв верхнего регистра.'}
                            patternRule={/(?=.*[A-Z])[\S]{8,}/}
                            type='password'
                        />
                        <InputText
                            name='newPasswordOnce'
                            label='Новый пароль'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Минимум 8 символов, одна или более букв верхнего регистра.'}
                            patternRule={/(?=.*[A-Z])[\S]{8,}/}
                            type='password'
                        />
                        <InputText
                            name='newPasswordTwice'
                            label='Новый пароль'
                            requiredMessage={'Это поле обязательно'}
                            errorMessage={'Минимум 8 символов, одна или более букв верхнего регистра.'}
                            patternRule={/(?=.*[A-Z])[\S]{8,}/}
                            type='password'
                        />
                        <button type='submit' className='button' disabled={Object.values(errors).length > 0 ? 'disabled' : undefined}>Изменить</button>
                    </form>
                    {
                        errorUpdate && <span className='error'>{errorUpdate}</span>
                    }
                </FormProvider>
                <button className='button button-close-popup' onClick={closePopup}>X</button>
            </div>

        </>
    );
}

export default FormChangePassword;