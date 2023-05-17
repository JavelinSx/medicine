require('dotenv').config()
const {ERRORS_MESSAGE} = require('../utils/constant')
const BadAuthError = require('../errors/bad_auth');

module.exports.adminCheck = (req, res, next) => {
    const {role} = req.body.user || req
    if (role === 'admin') {
        return next();
    }else{
        next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData));
    }
}

module.exports.doctorCheck = (req, res, next) => {
    const {role} = req.body.user ||req
    if (role !== 'patient') {
        return next();
    }else{
        next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData));
    }
}
