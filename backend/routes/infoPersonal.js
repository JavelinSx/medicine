const router = require('express').Router()
const { getAdmins } = require('../controllers/admins');
const { getDoctors } = require('../controllers/doctors');
const { getRegistrars } = require('../controllers/registrars');
const { getNurses } = require('../controllers/nurses');
const { getPatients } = require('../controllers/patients');

router.get('/admins', getAdmins)
router.get('/doctors', getDoctors)
router.get('/registrars', getRegistrars)
router.get('/nurses', getNurses)
router.get('/patients', getPatients)

module.exports = router