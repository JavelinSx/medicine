const router = require('express').Router()

const adminRouter = require('./admins')
const doctorRouter = require('./doctors')
const cardRouter = require('./cards')
const registrarRouter = require('./registrar')
const nurseRouter = require('./nurse')
const patientRouter = require('./patient')
const login = require('./login')
const infoMe = require('./infoMe')
const infoPersonal = require('./infoPersonal')
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const updateUser = require('./updateUser')
const {auth} = require('../middlewares/auth')
// const {loginAdmin} = require('../controllers/admins')
// const {loginDoctor} = require('../controllers/doctors')
// const {loginRegistrar} = require('../controllers/registrars')
// const {loginNurse} = require('../controllers/nurses')
// const {loginPatient} = require('../controllers/patients')
const {
    chooseRoleLogin,
    chooseRoleLogout,
    chooseRoleRegister,
    chooseRoleInfo,
    chooseRoleInfoOne,
    chooseRoleDelete,
    chooseRoleUpdate,
} = require('../middlewares/chooseRole')



router.use('/signin', login)

router.use(auth)

router.use('/info', infoMe)
router.use('/info-all', infoPersonal)

router.use('/create', createUser)

router.use('/delete', deleteUser)

router.use('/update', updateUser)


router.use('/cards', cardRouter)

router.post('/signout', (req, res, next)=>{
    res.clearCookie('token').send({logout: "успешный выход"})
})

router.use('*', (req, res, next) => {
    next(new Error('Страница не найдена'))
})

module.exports = router