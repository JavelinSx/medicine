import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectRole({handleSelectLoginRole}) {
    const navigate = useNavigate();

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
        if(roleText==='Пациент'){
            handleSelectLoginRole('patient')
            navigate('/signin/patient')
        }
        if(roleText==='Админ'){
            handleSelectLoginRole('admin')
            navigate('/signin/admin')
        }
        
    }

    return ( 
        <>
            <button onClick={handleSubmit}>Доктор</button>
            <button onClick={handleSubmit}>Регистратор</button>
            <button onClick={handleSubmit}>Медсестра</button>
            <button onClick={handleSubmit}>Пациент</button>
            <button onClick={handleSubmit}>Админ</button>
        </>
     );
}

export default SelectRole;