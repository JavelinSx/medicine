import InputText from "../InputText/InputText";
function FormUserCheck({ handleSubmit, onSubmit, errors }) {
    return (
        <>
            <form className='form-change-password' onSubmit={handleSubmit(onSubmit)}>

                <InputText
                    name='surName'
                    label='Фамилия'
                    requiredMessage={'Это поле обязательно'}
                    errorMessage={'Пожалуйста, введите фамилию, используя только русские буквы'}
                    patternRule={/^[а-яёА-ЯЁ]+$/u}
                    type='text'
                />
                <InputText
                    name='name'
                    label='Имя'
                    requiredMessage={'Это поле обязательно'}
                    errorMessage={'Пожалуйста, введите имя, используя только русские буквы'}
                    patternRule={/^[а-яёА-ЯЁ]+$/u}
                    type='text'
                />
                <InputText
                    name='middleName'
                    label='Отчество'
                    requiredMessage={'Это поле обязательно'}
                    errorMessage={'Пожалуйста, введите отчество, используя только русские буквы'}
                    patternRule={/^[а-яёА-ЯЁ]+$/u}
                    type='text'
                />

                <button type='submit' className='button' disabled={Object.values(errors).length > 0 ? 'disabled' : undefined}>Далее</button>
            </form>
        </>
    );
}

export default FormUserCheck;