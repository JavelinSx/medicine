import React, { useState } from 'react';

function CreateCard({text, onConfirm }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmAction = () => {
    setShowConfirmation(false);
    onConfirm();
  };

  return (
    <div>
      <button className='button' onClick={handleConfirmation}>Создать карточку</button>

      {showConfirmation && (
        <div className="confirmation-modal">
          <p>{text}</p>
          <button onClick={handleConfirmAction}>Да</button>
          <button onClick={handleCancel}>Нет</button>
        </div>
      )}
    </div>
  );
}

export default CreateCard;
