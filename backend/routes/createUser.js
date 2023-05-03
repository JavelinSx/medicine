const router = require('express').Router()
const {registerAdmin}  = require('../controllers/admins');
const {registerDoctor} = require('../controllers/doctors');
const {registerRegistrar} = require('../controllers/registrars');
const {registerNurse} = require('../controllers/nurses');
const {registerPatient} = require('../controllers/patients');

router.post('/admin', registerAdmin)
router.post('/doctor', registerDoctor)
router.post('/registrar', registerRegistrar)
router.post('/nurse', registerNurse)
router.post('/patient', registerPatient)

module.exports = router