import React, { useState, forwardRef } from 'react';

const DateInput = forwardRef(({ value, onChange }, ref) => {
  const [formattedValue, setFormattedValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Удаляем все символы, кроме цифр

    let formatted = '';
    let day = '';
    let month = '';
    let year = '';

    for (let i = 0; i < numericValue.length; i++) {
      const digit = numericValue.charAt(i);

      if (i < 2) {
        day += digit;
      } else if (i < 4) {
        month += digit;
      } else {
        year += digit;
      }
    }

    if (day) {
      formatted += day;
    }

    if (day.length === 2) {
      formatted += '.';
    }

    if (month) {
      formatted += month;
    }

    if (month.length === 2) {
      formatted += '.';
    }

    if (year) {
      formatted += year;
    }

    setFormattedValue(formatted);
    if (onChange) {
      onChange(formatted);
    }
  };

  return <input className='input' maxLength='10' type="text" value={formattedValue} onChange={handleChange} />;
});

export default DateInput;
