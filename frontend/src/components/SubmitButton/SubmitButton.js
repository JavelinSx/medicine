import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isEqual } from 'lodash'

function SubmitButton({ onSubmit, classNamePrefix, textButton, formSubmitted, data }) {
    const { formState: { errors }, watch, setValue, getValues } = useFormContext();
    const watchedValues = watch();
    const [prevValues, setPrevValues] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setPrevValues(data)
    }, [data, setValue, formSubmitted])

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setHasChanges(isEqual(watchedValues, prevValues))
        } else {
            setHasChanges(true)
        }
    }, [watchedValues, hasChanges, errors, prevValues]);

    return (
        <button type="submit" className={`button ${classNamePrefix}`} disabled={hasChanges ? 'disabled' : null} onClick={onSubmit}>{textButton}</button>
    );
}

export default SubmitButton;