
import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { openHelpPopup } from '../../ducks/usersUpdate';
import InputText from '../InputText/InputText';

import { getDoctors } from '../../utils/sessionStorageInfo';
import { fetchHelp, fetchHelpMessage } from '../../ducks/usersPost'
import FormUserCheck from '../FormUserCheck/FormUserCheck';
import FormDoctorSelect from '../FormDoctorSelect/FormDoctorSelect';

function HelpPopup() {

    const dispatch = useDispatch();

    const { errorUpdate, helpPopup } = useSelector((state) => state.usersUpdate)
    const { doctorsHelp, errorPost } = useSelector((state) => state.usersPost)
    const { errorGet } = useSelector((state) => state.usersGet)

    const [doctorList, setDoctorList] = useState([])
    const [step, setStep] = useState(1)
    const [successfullyCreateMessage, setSuccessfullyCreateMessage] = useState(false)
    const [errorViewServerMessage, setErrorViewServerMessage] = useState(false)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    useEffect(() => {
        setDoctorList(doctorsHelp?.map((doctor) => ({
            value: doctor._id,
            label: doctor.surName + ' ' + doctor.name + ' ' + doctor.middleName,
        })))
    }, [step, doctorsHelp])

    const onSubmit = (data) => {
        if (step === 1) {
            dispatch(fetchHelp(data))
                .then((data) => {

                    if (data.type.includes('fulfilled')) {
                        setStep(2)
                    }
                })
        }
        if (step === 2) {
            const dataSend = {
                doctorId: data.doctorHelp,
                comments: data.comments,
                user: data.surName + " " + data.name + " " + data.middleName
            }
            dispatch(fetchHelpMessage(dataSend))
                .then(() => {
                    reset()
                    setStep(1)
                    setSuccessfullyCreateMessage(true)
                    setTimeout(() => {
                        setSuccessfullyCreateMessage(false)
                    }, 5000)
                })
        }
        if (errorPost) {
            setErrorViewServerMessage(true)
            setTimeout(() => {
                setErrorViewServerMessage(false)
            }, 5000)
        }
    }

    const closePopup = () => {
        dispatch(openHelpPopup(false))
    }

    const renderForm = () => {
        switch (step) {
            case 1: return (
                <FormUserCheck onSubmit={onSubmit} handleSubmit={handleSubmit} errors={errors} />
            );
            case 2: return (
                <FormDoctorSelect onSubmit={onSubmit} handleSubmit={handleSubmit} errors={errors} doctorList={doctorList} control={control} register={register} />
            );
            default: return null
        }
    }


    return (
        helpPopup &&
        <>
            <div className='form-change-password__container'>
                <FormProvider {...{ formState: { errors }, register }}>
                    {renderForm()}
                    {
                        errorGet && <span className='error'>{errorGet}</span>
                    }
                    {
                        errorUpdate && <span className='error'>{errorUpdate}</span>
                    }
                    {
                        errorViewServerMessage ? <span className='error'>{errorPost}</span> : null
                    }
                    {
                        successfullyCreateMessage ? <span className='complete-message'>Сообщение успешно отправлено</span> : null
                    }
                </FormProvider>
                <button className='button button-close-popup' onClick={closePopup}>X</button>
            </div>

        </>
    );
}

export default HelpPopup;