import {useState, useEffect, forwardRef, useMemo} from 'react'

const MySelectComponent = forwardRef(({ optionsProps, defaultValue, onChange }, ref) => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    const getValueFromObject = () => {
        const filteredOptions = optionsProps.filter((option) => option.value === defaultValue);
        return filteredOptions.map((option) => option.label);
    };

    const setValueForObject = () => {
        const filteredOptions = optionsProps.filter((option) => option.label === value);
        return filteredOptions.map((option) => option.value)[0]
    }

    useMemo(() => {
        setOptions(optionsProps)
        setValue(getValueFromObject())

    },[])

    useEffect(() => {
        if(selectedOption){
            setValue(selectedOption)
        }
    },[selectedOption])

    useEffect(() => {
        if(value){
            onChange(setValueForObject())
        }
    },[onChange, value])

    const handleOpenList = () => {
        setIsOpen(!isOpen)
    }

    const handleSelectOption = (option) => {
        setSelectedOption(option.label)
        setIsOpen(false)
    }



    return ( 
        <>

            <div className='myselect-wrapper'>

                <div className='input myselect-container' onClick={handleOpenList}>
                    {value}
                </div>
                
                <ul className={`myselect-list ${isOpen ? '' : 'myselect-list-hidden'}`}> 
                    {
                        options?.map((option, index) => <li key={index} className='myselect-list__item' onClick={() => handleSelectOption(option)}>{option.label}</li>)
                    }
                </ul> 
            </div>

        </>
     );
})

export default MySelectComponent;