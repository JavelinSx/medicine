import {useRef, useState} from 'react'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

function ButtonLoader(props) {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedFile, setSelectedFile] = useState(props.file || null);
    const hiddenFileInput = useRef(null);
    
    const handleClick = (event) => {
        event.preventDefault();
        if (props.file) {
            setShowConfirmation(true);

        } else {
          hiddenFileInput.current.click();
        }
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        
        props.handleFile(fileUploaded);
        props.validationFunction(fileUploaded);

        if (fileUploaded && fileUploaded.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
            setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(fileUploaded);
            console.log(fileUploaded)
        } else {
            setSelectedFile(null);
        }
    };

    const handleConfirm = () => {
        hiddenFileInput.current.click();
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    return ( 
        <>
        <button className='button button__load' onClick={handleClick}>Загрузить файл</button>
        <input 
            ref={hiddenFileInput} 
            onChange={handleChange} 
            type='file' 
            style={{display:'none'}}
        ></input>
        {selectedFile && (
            <div className='button-loader__image-wrapper'>
                <img className="button-loader__image" src={selectedFile} alt="файл" />
            </div>
        )}
        {showConfirmation && (
        <ConfirmationDialog functionConfirm={handleConfirm} functionCancel={handleCancel}/>
      )}
        </>
     );
}

export default ButtonLoader;