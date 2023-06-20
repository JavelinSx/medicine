import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectRole({handleSelectLoginRole}) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        handleSelectLoginRole('patient')
        navigate(-1)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const roleText = event.target.textContent
        if(roleText==='Доктор'){
            handleSelectLoginRole('doctor')
            navigate('/signin/doctor')
        }
        if(roleText==='Регистратор'){
            handleSelectLoginRole('registrar')
            navigate('/signin/registrar')
        }
        if(roleText==='Медсестра'){
            handleSelectLoginRole('nurse')
            navigate('/signin/nurse')
        }
        if(roleText==='Админ'){
            handleSelectLoginRole('admin')
            navigate('/signin/admin')
        }
        
    }

    return ( 
        <>
            <div className='select-role-header'>
                <button className='button' onClick={handleGoBack}>Назад</button>
            </div>
            <div className='select-role'>
                <button className='button' onClick={handleSubmit}>Доктор</button>
                <button className='button' onClick={handleSubmit}>Регистратор</button>
                <button className='button' onClick={handleSubmit}>Медсестра</button>
                <button className='button' onClick={handleSubmit}>Админ</button>
            </div>
        </>

     );
}

export default SelectRole;