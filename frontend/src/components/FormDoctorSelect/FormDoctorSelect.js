import MySelectComponent from '../MySelectComponent/MySelectComponent'

function FormDoctorSelect({ handleSubmit, onSubmit, errors, control, doctorList, register }) {
    return (
        <>

            <form className='form-change-password' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-create-user__wrapper-input'>
                    <label className="form-create-user__label-input">Выберите доктора</label>

                    <MySelectComponent
                        name='doctorHelp'
                        defaultValue=''
                        optionsProps={doctorList}
                    />

                </div>
                <div className='form__container form__textarea'>
                    <label className='form__label'>Напишите здесь вашу проблему</label>
                    <textarea
                        className='input form__input form__textarea'
                        {...register('comments')}
                    />
                </div>


                <button type='submit' className='button' disabled={Object.values(errors).length > 0 ? 'disabled' : undefined}>Далее</button>
            </form>


        </>
    );
}

export default FormDoctorSelect;