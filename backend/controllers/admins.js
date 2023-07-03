require('dotenv').config()

const { ERRORS_MESSAGE } = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');
const BadAuthError = require('../errors/bad_auth');
const ExistLoginError = require('../errors/exist_login_error');

const { NODE_ENV, JWT_PROD } = process.env
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_DEV } = require('../utils/constant')
const Admin = require('../models/admin')

module.exports.loginAdmin = (req, res, next) => {
    const { login, password } = req.body;

    Admin.findUserByCredentials(login, password)
        .then((user) => {

            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                NODE_ENV === 'production' ? JWT_PROD : JWT_DEV,
                { expiresIn: '7d' }
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
    res.clearCookie('token').send()
}

module.exports.registerAdmin = (req, res, next) => {
    const { login, password } = req.body

    return bcryptjs.hash(password, 10)
        .then((hash) => Admin.create({ login, password: hash }))
        .then((user) => {
            res.send({
                login: user.login, _id: user._id, role
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

module.exports.getAdmin = (req, res, next) => {
    Admin.findOne({ _id: req.user._id })
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((user) => {
            res.send(user)
        })
        .catch((err) => next(err))
}

module.exports.getAdmins = (req, res, next) => {
    Admin.find({})
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUsers))
        .then((user) => {
            res.send(user)
        })
        .catch((err) => next(err))
}

module.exports.updateAdmin = (req, res, next) => {
    const { surName, name, middleName } = req.body;
    Admin.findByIdAndUpdate(
        req.params.id,
        { surName, name, middleName },
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
            next(new Error(req.params))
        })
}

module.exports.deleteAdmin = (req, res, next) => {
    const { id } = req.params
    Admin.findByIdAndRemove(id)
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



