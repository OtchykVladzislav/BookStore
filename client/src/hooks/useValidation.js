import {useEffect, useState} from 'react'

export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(null)
    const [minValueError, setMinValueError] = useState(null)
    const [maxValueError, setMaxValueError] = useState(null)

    {value}

    useEffect(() => {
        for(const validation in validations){
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(null) : setIsEmpty('Пустое поле')
                    break;
                case 'minValue':
                    value < validations[validation] ? setMinValueError('Недостаточное минимальное значение') : setMinValueError(null)
                    break;
                case 'maxValue':
                    value > validations[validation] ? setMaxValueError('Максимальное значение превышено') : setMaxValueError(null)
                    break;
            }
        }
    }, [value])
    return{
        isEmpty,
        minValueError,
        maxValueError
    }
}