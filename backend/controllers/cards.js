const fs = require('fs')
const multer = require('multer')
const upload = require('../middlewares/multer')

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

// module.exports.updateCardPatientFiles = (req, res, next) => {
//   upload.array(['fileMRT', 'fileKT'])(req, res, function(err) {
//     if (err) {
//       return next(err);
//     }
//     const {
//       patientId,
//       cardId,
//       dateVisit,
//       markerCA,
//       symptoms,
//       comments,
//       healthScore,
//       resultForm,
//       mrtFile,
//       ctFile
//     } = req.body;
//     console.log(req.files)
//     Patient.findById(patientId)
//       .then(() => {
//         Card.findByIdAndUpdate(
//           cardId,
//           {
//             dateVisit,
//             markerCA,
//             symptoms,
//             comments,
//             healthScore,
//             resultForm,
//             mrtFile,
//             ctFile,
//             status: 'updated'
//           },
//           {
//             new: true,
//             runValidators: true
//           }
//         )
//           .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
//           .then(card => {
//             res.send(card);
//           })
//           .catch(err => {
//             next(err);
//           });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// };


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
    console.log(req.files)
    console.log(req.file)
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

                    status: 'updated'
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
            console.log(err)
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