import {useDispatch} from 'react-redux'

function PatientCard() {
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const formName = 'myForm';
    };

    const handleSubmit = (event) => {
        event.preventDefault()
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="surName" onChange={handleInputChange} />
                <input type="text" name="name" onChange={handleInputChange} />
                <input type="text" name="middleName" onChange={handleInputChange} />
                <button type="submit">Изменить</button>
            </form>
        </>
    );
}

export default PatientCard;