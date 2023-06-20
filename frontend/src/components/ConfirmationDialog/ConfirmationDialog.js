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
      <p>Вы уверены что хотите перезаписать файл?</p>
      <button className='button' onClick={handleConfirm}>Да</button>
      <button className='button' onClick={handleCancel}>Нет</button>
    </div>
  );
}

export default ConfirmationDialog;