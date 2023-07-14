const { ERRORS_MESSAGE } = require('../utils/constant')
const BadAuthError = require('../errors/bad_auth');
const Patient = require('../models/patient')
const Doctor = require('../models/doctor');
const HelpMessage = require('../models/helpMessage')

module.exports.patientCheck = (req, res, next) => {

    const { surName, name, middleName } = req.body
    Patient.patientCheck(surName, name, middleName)
        .then((data) => {
            console.log(data)
            Doctor.find({})
                .then((doctor) => res.send({ doctor }))
        })
        .catch((err) => {
            return next(new BadAuthError(ERRORS_MESSAGE.notFound.messageSearchUserHelp))
        })

}

module.exports.doctorMessage = (req, res, next) => {
    const { doctorId, comments, user } = req.body;

    Doctor.findOne({ _id: doctorId })
        .then((doctor) => {
            if (!doctor) {
                return Promise.reject(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData));
            }
            return HelpMessage.create({ doctorId: doctorId, comments: comments, user: user }); // создаем объект и передаем его в create()
        })
        .then((helpMessage) => {
            res.status(200).send({ message: 'Сообщение успешно отправлено.' });
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
};
