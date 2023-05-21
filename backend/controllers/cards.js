const fs = require('fs')
const path = require('path')

const {ERRORS_MESSAGE} = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');

const Card = require('../models/card');
const Patient = require('../models/patient');

module.exports.createCard = (req, res, next) => {

      const { patientId } = req.params;
  
      Patient.findById(patientId)
        .then(() => {
            Card.create({
                patient: patientId,
                status: 'new'
            });
        
            res.send({
                patient: patientId,
                status: 'new',
            });
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))   
        })
}

module.exports.updateCardPatient = (req, res, next) => {
    const { date,
            markerSA,
            symptoms,
            patientComment,
            healthScore,
            formResult } = req.formData.body.card;
    const { cardId } = req.params
    const { mrtFile,
            ctFile } = req.formData
    const mrtFileRead =  fs.readFileSync(mrtFile)
    const ctFileRead = fs.readFileSync(ctFile)
    console.log(req.body)    
    Card.findByIdAndUpdate(
        cardId,
        {   date,
            markerSA,
            symptoms,
            patientComment,
            mrtFileRead,
            ctFileRead,
            healthScore,
            formResult
        },
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
        next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
    })
}

module.exports.updateCardPatientFiles = (req, res, next) => {

    const {
        patientId,
        cardId, 
        dateVisit, 
        markerCA, 
        symptoms, 
        comments, 
        healthScore, 
        resultForm,
    } = req.body

    const {fileMRT, fileKT} = req.files
    let pathToDirMRT= ''
    let pathToDirKT= ''

    if(fileMRT){
        const fileExtension = fileMRT[0].originalname.split('.').pop();
        const fileName = `${fileMRT[0].fieldname}.${fileExtension}`;
        pathToDirMRT = path.resolve('uploads', patientId, cardId, fileName);

    }
    if(fileKT){
        const fileExtension = fileKT[0].originalname.split('.').pop();
        const fileName = `${fileKT[0].fieldname}.${fileExtension}`;
        pathToDirKT = path.resolve('uploads', patientId, cardId, fileName);

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
                    status: 'updated'
                },
                {
                    new: true,
                    runValidators: true,
                },
            )
                .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
                .then(card => {
                    console.log('hello')
                    res.send(card)
                })
                .catch((err) => {
                    console.log('hello1')
                    next(err)
                })
        })
        .catch((err) => {
            console.log('hello2')
            next(err)
        })
      
}

module.exports.getCardsPatient = (req, res, next) => {
    const {patientId} = req.params
    Card.find({patient: patientId})
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((card) => {
            res.send(card)
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}

module.exports.getCardFile = (req, res, next) => {
    const {patientId, cardId} = req.params
    Patient.findById(patientId)
        .then(() => {
            Card.findById(cardId)
                .then((card) => {
                    if(card?.fileMRT.length > 0){
                        const fileName = path.basename(card.fileMRT);
                        fs.promises.readFile(card.fileMRT, 'utf-8')
                            .then((fileContent) => {
                                // Логика для работы с содержимым файла
                            })
                            .catch((err) => {
                                // Обработка ошибки чтения файла
                            });
                    }
                })
        })
}

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

module.exports.getFileCard = (req, res, next) => {
    const {cardId, fileName} = req.params
    const {patient} = req.body
    Card.find({patient: patient})
        .then(() => {
            Card.findById(cardId)
            .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
            .then((card) => {
               res.sendFile(card[fileName]) 
            })
            .catch(() => {
                next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
            })
        })
        .catch(() => {
            next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        })
}