import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'

function InputText({ name, label, requiredMessage, errorMessage, patternRule, loginList, type, disabled }) {
    const { formState: { errors }, register } = useFormContext()
    const errorKey = Object.keys(errors)
    const [loginListUser, setLoginListUser] = useState(loginList)

    useEffect(() => {
        setLoginListUser(loginList)
    }, [loginList])

    const customValidator = (val) => {
        if (val && loginListUser.includes(val)) {
            return "Такой логин уже существует";
        }
        return true;
    };

    return (
        <div className='input-text__wrapper'>
            <label className='input-text__label'>{label}</label>
            <input className={`input ${errorKey.includes(name) ? 'input-error' : null}`} autoComplete='off' type={type} disabled={disabled}
                {...register(name, {
                    required: requiredMessage,
                    pattern: {
                        value: patternRule,
                        message: errorMessage
                    },
                    ...(loginList && { validate: customValidator })
                })}
            />
            {
                errorKey.includes(name) ? <span className='error'>{errors[name]?.message}</span> : null
            }

        </div>
    );
}

export default InputText;