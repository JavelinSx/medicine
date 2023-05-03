const router = require('express').Router()
const {updateAdmin}  = require('../controllers/admins');
const {updateDoctor} = require('../controllers/doctors');
const {updateRegistrar} = require('../controllers/registrars');
const {updateNurse} = require('../controllers/nurses');
const {updatePatient} = require('../controllers/patients');

router.patch('/patient/:id', updatePatient)
router.patch('/doctor/:id', updateDoctor)
router.patch('/nurse/:id', updateNurse)
router.patch('/registrar/:id', updateRegistrar)
router.patch('/admin/:id', updateAdmin)

module.exports = router