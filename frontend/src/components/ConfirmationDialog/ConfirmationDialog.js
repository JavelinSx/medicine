import React from 'react';

function ConfirmationDialog(props) {
  const handleConfirm = () => {
    props.function();
  };

  return (
    <div className="confirmation-dialog">
      <p>Вы уверены что хотите перезаписать файл?</p>
      <button onClick={handleConfirm}>Да</button>
      <button>Нет</button>
    </div>
  );
}

export default ConfirmationDialog;