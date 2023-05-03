const router = require('express').Router()
const {deleteAdmin}  = require('../controllers/admins');
const {deleteDoctor} = require('../controllers/doctors');
const {deleteRegistrar} = require('../controllers/registrars');
const {deleteNurse} = require('../controllers/nurses');
const {deletePatient} = require('../controllers/patients');

router.post('/patient/:id', deletePatient)
router.post('/doctor/:id', deleteDoctor)
router.post('/nurse/:id', deleteNurse)
router.post('/registrar/:id', deleteRegistrar)
router.post('/admin/:id', deleteAdmin)

module.exports = router