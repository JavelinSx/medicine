const router = require('express').Router()
const { getAdmin } = require('../controllers/admins');
const { getDoctor } = require('../controllers/doctors');
const { getRegistrar } = require('../controllers/registrars');
const { getNurse } = require('../controllers/nurses');
const { getPatient } = require('../controllers/patients');

router.get('/patient', getPatient)
router.get('/doctor', getDoctor)
router.get('/nurse', getNurse)
router.get('/registrar', getRegistrar)
router.get('/admin', getAdmin)

module.exports = router