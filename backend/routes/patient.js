const router = require('express').Router()
const {
    getPatient,
    getPatients,
} = require('../controllers/patients')

const {
    updateCardPatientFiles,
    getFileCard
} = require('../controllers/cards')

const {uploadFormidable} = require('../middlewares/formidable')

router.get('/patient/:id', getPatient)
router.get('/patient-all', getPatients)
router.patch('/update-card-file', uploadFormidable, updateCardPatientFiles)
router.get('/uploads/:cardId/:fileName', getFileCard);


module.exports = router