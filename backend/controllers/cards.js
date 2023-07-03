const fs = require('fs')
const path = require('path')
const archiver = require('archiver');
const { ERRORS_MESSAGE } = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');
const BadFileError = require('../errors/bad_file');
const { searchFile } = require('../utils/searchFile')
const Card = require('../models/card');
const Patient = require('../models/patient');

module.exports.createCard = (req, res, next) => {

    const { patientId } = req.params;

    Patient.findById(patientId)
        .then(() => {
            Card.create({
                patientId: patientId,
                status: 'new'
            })
                .then(() => {
                    res.send({
                        patientId: patientId,
                        status: 'new',
                    });
                })
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}

module.exports.updateCardPatientFiles = (req, res, next) => {
    const { patientId, cardId } = req.params
    const {
        dateVisit,
        markerCA,
        symptoms,
        comments,
        healthScore,
        resultForm,
        status,
    } = req.body

    const { fileMRT, fileKT } = req.files

    let pathToDirMRT = ''
    let pathToDirKT = ''

    if (fileMRT) {
        const fileExtension = fileMRT[0].originalname.split('.').pop();
        const fileName = `${fileMRT[0].fieldname}.${fileExtension}`;
        pathToDirMRT = path.resolve('uploads', patientId, cardId, fileName);
    } else {
        pathToDirMRT = req.body.fileMRT
    }

    if (fileKT) {
        const fileExtension = fileKT[0].originalname.split('.').pop();
        const fileName = `${fileKT[0].fieldname}.${fileExtension}`;
        pathToDirKT = path.resolve('uploads', patientId, cardId, fileName);
    } else {
        pathToDirKT = req.body.fileKT
    }

    Patient.findById(patientId)
        .then(() => {
            Card.findByIdAndUpdate(
                cardId,
                {
                    dateVisit,
                    markerCA,
                    symptoms,
                    comments,
                    healthScore,
                    resultForm,
                    fileMRT: pathToDirMRT,
                    fileKT: pathToDirKT,
                    status: status === 'new' ? 'updated' : status
                },
                {
                    new: true,
                    runValidators: true,
                },
            )
                .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
                .then(card => {
                    res.send(card)
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })

}

module.exports.deleteCard = (req, res, next) => {
    const { cardId } = req.params
    Card.findByIdAndRemove(cardId)
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((card) => {
            res.send(card)
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
            }
            return next(err);
        });
}

module.exports.getCardsPatient = (req, res, next) => {
    const { patientId } = req.params
    Card.find({ patient: patientId })
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((card) => {
            res.send(card)
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}

module.exports.getCardFile = (req, res, next) => {
    const { patientId, cardId } = req.params;
    Patient.findById(patientId)
        .then(() => {
            Card.findById(cardId)
                .then((card) => {
                    if (card?.fileMRT.length > 0 || card?.fileKT.length > 0) {
                        const archive = archiver('zip');
                        const files = [];
                        if (card?.fileMRT.length > 0) {
                            files.push(card.fileMRT);
                        }

                        if (card?.fileKT.length > 0) {
                            files.push(card.fileKT);
                        }

                        files.forEach((file) => {
                            archive.file(file, { name: path.basename(file) }); // Устанавливаем имя файла в архиве
                        });

                        archive.on('error', (err) => {
                            throw err;
                        });

                        res.attachment('files.zip'); // Устанавливаем имя файла для скачивания
                        archive.pipe(res);
                        archive.finalize();
                    } else {
                        // Отправить сообщение, что файлов нет
                        res.send({ message: 'Файлов не найдено' });
                    }
                })
                .catch(() => {
                    next(new BadFileError(ERRORS_MESSAGE.badFile.messageDefault))
                })
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.notFound.messageSearchUser))
        })
};

module.exports.getAllCardsPatients = (req, res, next) => {
    Card.find()

        .then((card) => {
            res.send(card)
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}

module.exports.deleteCardPatient = (req, res, next) => {
    const { cardId } = req.params
    Card.findById(cardId)
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((card) => {
            return Card.findByIdAndRemove(cardId)
                .then(() => res.send(card))

        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}
