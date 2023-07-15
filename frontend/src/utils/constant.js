export const selectRoleUser = [
    { value: 'doctor', label: 'Доктор' },
    { value: 'patient', label: 'Пациент' },
    { value: 'nurse', label: 'Медсестра' },
    { value: 'registrar', label: 'Регистратор' },
]

export const checkBoxData = [
    {
        nameGroup: 'Подвижность',

        boxes: [
            {
                mobilityQuestionFirst: 'Я не испытываю трудностей при ходьбе',
                isChecked: false
            },
            {
                mobilityQuestionSecond: 'Я испытываю некоторые трудности при ходьбе',
                isChecked: false
            },
            {
                mobilityQuestionThird: 'Я прикован (-а) к постели ',
                isChecked: false
            },
        ]
    },
    {
        nameGroup: 'Уход за собой',

        boxes: [
            {
                selfCareQuestionFirst: 'Я не испытываю трудностей при уходе за собой',
                isChecked: false
            },
            {
                selfCareQuestionSecond: 'Я испытываю некоторые трудности с мытьем или одеванием ',
                isChecked: false
            },
            {
                selfCareQuestionThird: 'Я не в состоянии сам (-а) мыться или одеваться',
                isChecked: false
            },
        ]
    },
    {
        nameGroup: 'Повседневная деятельность',

        boxes: [
            {
                activityQuestionFirst: 'Я не испытываю трудностей в моей привычной повседневной деятельности',
                isChecked: false
            },
            {
                activityQuestionSecond: 'Я испытываю некоторые трудности в моей привычной повседневной деятельности',
                isChecked: false
            },
            {
                activityQuestionThird: 'Я не в состоянии заниматься своей привычной повседневной деятельностью',
                isChecked: false
            },
        ]
    },
    {
        nameGroup: 'Боль/Дискомфорт',

        boxes: [
            {
                painQuestionFirst: 'Я не испытываю боли или дискомфорта',
                isChecked: false
            },
            {
                painQuestionSecond: 'Я испытываю умеренную боль или дискомфорт',
                isChecked: false
            },
            {
                painQuestionThird: 'Я испытываю крайне сильную боль или дискомфорт',
                isChecked: false
            },
        ]
    },
    {
        nameGroup: 'Тревога/Депрессия',

        boxes: [
            {
                depressionQuestionFirst: 'Я не испытываю тревоги или депрессии',
                isChecked: false
            },
            {
                depressionQuestionSecond: 'Я испытываю умеренную тревогу или депрессию',
                isChecked: false
            },
            {
                depressionQuestionThird: 'Я испытываю крайне сильную тревогу или депрессию ',
                isChecked: false
            },
        ]
    },
]

export const patternInputTextRu = /^[а-яёА-ЯЁ]+$/u
export const patternInputTextEn = /^[a-zA-Z0-9]+$/
export const patternInputTextPassword = /(?=.*[A-Z])[\S]{8,}/