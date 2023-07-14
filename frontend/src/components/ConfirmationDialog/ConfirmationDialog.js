import React from 'react';

function ConfirmationDialog(props) {
  const handleConfirm = () => {
    props.functionConfirm();
  };

  const handleCancel = () => {
    props.functionCancel();
  }

  return (
    <div className="confirmation-dialog">
      <p className='confirmation-dialog__text'>Вы уверены что хотите перезаписать файл?</p>
      <div className='confirmation-dialog__container'>
        <button className='button' onClick={handleConfirm}>Да</button>
        <button className='button' onClick={handleCancel}>Нет</button>
      </div>

    </div>
  );
}

export default ConfirmationDialog;