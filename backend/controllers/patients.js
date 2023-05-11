require('dotenv').config()

const {ERRORS_MESSAGE} = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');
const BadAuthError = require('../errors/bad_auth');
const ExistLoginError = require('../errors/exist_login_error');

const { NODE_ENV, JWT_PROD } = process.env
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_DEV } = require('../utils/constant')
const Patient = require('../models/patient')

module.exports.loginPatient = (req, res, next) => {
    const {login, password} = req.body;
    Patient.findUserByCredentials(login, password)
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
                gender: user.gender,
                birthDay: user.birthDay
            })
        })
        .catch(() => {
            next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData))
        })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token')
}

module.exports.registerPatient = (req, res, next) => {
    const {login, password, surName, name, middleName, gender, birthDay} = req.body
    return bcryptjs.hash(password, 10)
    .then((hash) => Patient.create({ login, password: hash, surName, name, middleName, gender, birthDay}))
    .then((user) => {
        res.send({
            login: user.login, 
            _id: user._id,
            surName: user.surName,
            name: user.name,
            middleName: user.middleName,
            gender: user.gender,
            birthDay: user.birthDay
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
}

module.exports.getPatient = (req, res, next) => {
    Patient.findOne({_id: req.user._id})
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
    .then((patient) => {
        console.log(patient)
        res.send(patient)
    })
    .catch((err) => next(err))
}

module.exports.getPatients = (req, res, next) => {
    Patient.find({})
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUsers))
    .then((user) => {
        res.send(user)
    })
    .catch((err) => next(err))
}

module.exports.updatePatient = (req, res, next) => {
    const { surName, name, middleName, gender, birthDay } = req.body;
    console.log(birthDay)
    Patient.findByIdAndUpdate(
        req.params.id,
        {surName, name, middleName, gender, birthDay},
        {
            new: true,
            runValidators: true,
        }
    )
    .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
    .then((patient) => {
        res.send(patient)
    })
    .catch((err) => {
        next(new Error(err))
    })
}

module.exports.deletePatient = (req, res, next) => {
    const {id} = req.params
    Patient.findByIdAndRemove(id)
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            if (err.name === 'CastError') {
              return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
            }
            return next(err);
        });
}