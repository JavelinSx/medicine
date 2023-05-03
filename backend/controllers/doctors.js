require('dotenv').config()
const Doctor = require('../models/doctor')

const {ERRORS_MESSAGE} = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');
const BadAuthError = require('../errors/bad_auth');
const ExistLoginError = require('../errors/exist_login_error');

const { NODE_ENV, JWT_PROD } = process.env
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_DEV } = require('../../../diplom/movies-explorer-api/utils/const')


module.exports.loginDoctor = (req, res, next) => {
    const {login, password} = req.body;
    Doctor.findUserByCredentials(login, password)
        .then((user) => {
            const token = jwt.sign(
                {
                    _id: user._id,
                    role:user.role
                },
                NODE_ENV === 'production' ? JWT_PROD : JWT_DEV,
                {expiresIn: '7d'}
            );
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .send({
                login: user.login,
                role: user.role,
                name: user.name,
                surName: user.serName,
                middleName: user.middleName,
            })
        })
        .catch(() => {
            next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData))
        })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token')
}

module.exports.registerDoctor = (req, res, next) => {
    const {login, password} = req.body
    const {role} = req.user
    role === 'admin' || role === 'doctor' ?
    bcryptjs.hash(password, 10)
    .then((hash) => Doctor.create({ login, password: hash}))
    .then((user) => {
        res.send({
            login: user.login, _id: user._id
        })
    })
    .catch((err) => {
        if (err.name === 'ValidationError') {
            return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
          }
          if (err.code === 11000) {
            return next(new ExistLoginError(ERRORS_MESSAGE.existConflict.messageDefault));
          }
          return next(err);
    })
    : next(new BadAuthError(ERRORS_MESSAGE.permissionConfilct.messageDefault))
}

module.exports.getDoctors = (req, res, next) => {
    Doctor.find({})
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
    .then((user) => {
        res.send(user)
    })
    .catch((err) => next(err))
}

module.exports.getDoctor = (req, res, next) => {
    Doctor.findOne({_id: req.body._id})
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
    .then((user) => {
        res.send(user)
    })
    .catch((err) => next(err))
}

module.exports.updateDoctor = (req, res, next) => {
    const { surName, name, middleName } = req.body;
    const {role} = req.user
    console.log(req.data)
    console.log(role)
    console.log(req.params.id)
    role === 'admin' || role === 'doctor' ?
    Doctor.findByIdAndUpdate(
        req.params.id,
        {surName, name, middleName},
        {
            new: true,
            runValidators: true,
        }
    )
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
    .then((user) => {
        res.send(user)
    })
    .catch(() => {
        next(new Error('Ошибка при обнолвении данных пользователя'))
    })
    : next(new BadRequestError(ERRORS_MESSAGE.permissionConfilct.messageDefault))

}

module.exports.deleteDoctor = (req, res, next) => {
    const {id} = req.params
    const {role} = req.user
    role === 'admin' || role === 'doctor' ?
    Doctor.findByIdAndRemove(id)
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            if (err.name === 'CastError') {
              return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
            }
            return next(err);
        })
    : next(new BadRequestError(ERRORS_MESSAGE.permissionConfilct.messageDefault))
}
