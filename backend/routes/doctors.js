const router = require('express').Router()

const {
    registerDoctor,
    getDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
} = require('../controllers/doctors')

const {
    registerPatient,
    getPatients,
    updatePatient,
    deletePatient,
} = require('../controllers/patients')

const {
    registerRegistrar,
    getRegistrars,
    updateRegistrar,
    deleteRegistrar,
} = require('../controllers/registrars')

const {
    registerNurse,
    getNurses,
    updateNurse,
    deleteNurse,
} = require('../controllers/nurses')

const {
    createCard,
    getCardsPatient,
    getAllCardsPatients,
    deleteCardPatient,
    updateCardPatientFiles,
    getFileCard
} = require('../controllers/cards')

const {uploadFormidable} = require('../middlewares/formidable')

const {doctorCheck} = require('../middlewares/roleCheck')

router.patch('/update-card-file', uploadFormidable, updateCardPatientFiles)
router.get('/uploads/:cardId/:fileName', getFileCard);

router.use(doctorCheck)

router.post('/register-doctor', registerDoctor)
router.post('/register-nurse', registerNurse)
router.post('/register-registrar', registerRegistrar)
router.post('/register-patient', registerPatient)

router.get('/get-doctors', getDoctors)
router.get('/get-nurses', getNurses)
router.get('/get-registrars', getRegistrars)
router.get('/get-patients', getPatients)

router.patch('/update-doctor/:id', updateDoctor)
router.patch('/update-patient/:id', updatePatient)

router.post('/delete-registrar/:id', deleteRegistrar)
router.post('/delete-nurse/:id', deleteNurse)
router.post('/delete-patient/:id', deletePatient)
router.post('/delete-doctor/:id', deleteDoctor)

router.get('/patient-card/:patientId', getCardsPatient)
router.get('/all/cards-patients', getAllCardsPatients)
router.post('/delete-card/:cardId', deleteCardPatient)
router.post('/create-card/:patientId', createCard)

module.exports = router