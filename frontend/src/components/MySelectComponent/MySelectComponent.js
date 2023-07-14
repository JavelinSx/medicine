import { useState, useMemo } from 'react'
import { useFormContext, useController } from 'react-hook-form'

const MySelectComponent = ({ optionsProps, defaultValue }) => {
    const { control } = useFormContext();
    const { field } = useController({
        name: "gender",
        control,
        defaultValue,
    });
    const getValue = () => optionsProps?.find((option) => option.value === defaultValue)


    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(getValue()?.label)


    useMemo(() => {
        setOptions(optionsProps)
    }, [])


    const handleOpenList = () => {
        setIsOpen(!isOpen)
    }

    const handleSelectOption = (option) => {
        setSelectedOption(option.label)
        field.onChange(option.value)
        setIsOpen(false)
    }



    return (
        <>

            <div className='myselect-wrapper'>

                <div className='input myselect-container' onClick={handleOpenList}>
                    {selectedOption}
                </div>

                <ul className={`myselect-list ${isOpen ? '' : 'myselect-list-hidden'}`}>
                    {
                        options?.map((option, index) => <li key={index} className='myselect-list__item' onClick={() => handleSelectOption(option)}>{option.label}</li>)
                    }
                </ul>
            </div>




        </>
    );
}

export default MySelectComponent;