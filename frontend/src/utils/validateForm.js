export const validate = values => {
    const errors = {}
    if(!values.name){
        errors.name = 'Поле не может быть пустым'
    }
    if(!values.surName){
        errors.surName = 'Поле не может быть пустым'
    }
    if(!values.middleName){
        errors.middleName = 'Поле не может быть пустым'
    }
    return errors
}

export const warn = values => {
    const warnings = {}
    const cyrillicPattern = /[а-яА-ЯЁё]/
    const latinPattern = /[A-z\u00C0-\u00ff]+/
    const numberPattern = /\d+/
    console.log(values)
    if(latinPattern.test(values.name) || numberPattern.test(values.name)){
        warnings.name = 'Имя должно содержать только кирилицу'
    }
    if(latinPattern.test(values.surName) || numberPattern.test(values.surName)){
        warnings.surName = 'Фамилия должно содержать только кирилицу'
    }
    if(latinPattern.test(values.middleName) || numberPattern.test(values.middleName)){
        warnings.middleName = 'Отчество должно содержать только кирилицу'
    }
    return warnings
}