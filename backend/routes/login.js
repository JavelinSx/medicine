const router = require('express').Router()
const {loginAdmin}  = require('../controllers/admins');
const {loginDoctor} = require('../controllers/doctors');
const {loginRegistrar} = require('../controllers/registrars');
const {loginNurse} = require('../controllers/nurses');
const {loginPatient} = require('../controllers/patients');

router.post('/admin', loginAdmin)
router.post('/doctor', loginDoctor)
router.post('/registrar', loginRegistrar)
router.post('/nurse', loginNurse)
router.post('/patient', loginPatient)

module.exports = router