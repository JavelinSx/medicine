export const setPatients = (patients) => sessionStorage.setItem('patients', JSON.stringify(patients))
export const getPatients = JSON.parse(sessionStorage.getItem('patients'))

export const setPatient = (patient) => sessionStorage.setItem('patient', JSON.stringify(patient))
export const getPatient = JSON.parse(sessionStorage.getItem('patient'))

export const setDoctors = (doctors) => sessionStorage.setItem('doctors', JSON.stringify(doctors))
export const getDoctors = JSON.parse(sessionStorage.getItem('doctors'))

export const setRegistrars = (registrar) => sessionStorage.setItem('registrar', JSON.stringify(registrar))
export const getRegistrars = JSON.parse(sessionStorage.getItem('registrar'))

export const setNurses = (nurse) => sessionStorage.setItem('nurse', JSON.stringify(nurse))
export const getNurses = JSON.parse(sessionStorage.getItem('nurse'))

export const setCard = (card) => sessionStorage.setItem('card', JSON.stringify(card))
export const getCard = JSON.parse(sessionStorage.getItem('card'))

export const setCards = (cards) => sessionStorage.setItem('cards', JSON.stringify(cards))
export const getCards = JSON.parse(sessionStorage.getItem('cards'))

export const setCardsPatient = (cards) => sessionStorage.setItem('cardsPatient', JSON.stringify(cards))
export const getCardsPatient = JSON.parse(sessionStorage.getItem('cardsPatient'))


