const { ERRORS_MESSAGE } = require('../utils/constant')
const BadAuthError = require('../errors/bad_auth');

module.exports.roleCheck = (req, res, next) => {

    const { role } = req.user
    if (role && role !== 'patient') {
        return next();
    } else {
        next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorectedRole));
    }
}
