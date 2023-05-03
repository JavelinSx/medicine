const router = require('express').Router()
const {
    createCard,
    getCardsPatient,
    getAllCardsPatients,
    deleteCardPatient,
    updateCardPatient,
    getFileCard
} = require('../controllers/cards')
const { doctorCheck } = require('../middlewares/roleCheck')


router.get('/:patientId', getCardsPatient)
router.patch('/:cardId', updateCardPatient)

router.use(doctorCheck)

router.get('/all/cards-patient', getAllCardsPatients)
router.post('/delete/:cardId', deleteCardPatient)
router.post('/:patientId', createCard)

router.get('/uploads/:cardId/:fileName', getFileCard);

module.exports = router