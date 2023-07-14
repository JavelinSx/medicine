const router = require('express').Router()

const cardRouter = require('./cards')
const login = require('./login')
const infoMe = require('./infoMe')
const infoPersonal = require('./infoPersonal')
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const updateUser = require('./updateUser')
const { auth } = require('../middlewares/auth')
const { roleCheck } = require('../middlewares/roleCheck')
const { patientCheck, doctorMessage } = require('../middlewares/patientCheck')

router.use('/signin', login)
router.use('/help', patientCheck)
router.use('/help-message', doctorMessage)

router.use(auth)

router.use('/info', infoMe)
router.use('/update', updateUser)
router.use('/cards', cardRouter)

router.use('/info-all', roleCheck, infoPersonal)
router.use('/create', roleCheck, createUser)
router.use('/delete', roleCheck, deleteUser)



router.post('/signout', (req, res, next) => {
    res.clearCookie('token').send({ logout: "успешный выход" })
})

router.use('*', (req, res, next) => {
    next(new Error('Страница не найдена'))
})

module.exports = router