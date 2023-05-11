const router = require('express').Router()

const cardRouter = require('./cards')
const login = require('./login')
const infoMe = require('./infoMe')
const infoPersonal = require('./infoPersonal')
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const updateUser = require('./updateUser')
const {auth} = require('../middlewares/auth')

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