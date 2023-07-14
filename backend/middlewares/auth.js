require('dotenv').config()
const { ERRORS_MESSAGE } = require('../utils/constant')
const BadAuthError = require('../errors/bad_auth');
const jwt = require('jsonwebtoken')
const { JWT_DEV } = require('../utils/constant')
const { NODE_ENV = 'development', JWT_PROD } = process.env


module.exports.auth = (req, res, next) => {
    const { token } = req.cookies
    let payload;
    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_PROD : JWT_DEV)
    } catch {
        next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData))
    }
    req.user = payload
    next()
}