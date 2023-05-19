const formidable = require('formidable');
const {ERRORS_MESSAGE} = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const path = require('path');
const fs = require('fs');

module.exports.uploadFormidable = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 5 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData))
        }
        const {cardId} = fields
        const fileKeys = Object.keys(files)

        req.body = fields

        const filePromises = fileKeys.map((key) => {
            const file = files[key]
            const fileName = key + "-" + cardId
            const filePath = path.join('C:\\Users\\Boot\\Documents\\GitHub\\spb-medicine-backend\\backend\\', 'uploads', fileName)

            const writeStream = fs.createWriteStream(filePath)
            const readStream = fs.createReadStream(file.filepath)
            readStream.pipe(writeStream)
            req.body[key] = filePath
            return new Promise((resolve, reject) => {
                readStream.on('error', (err) => {
                    reject(err)
                })
                writeStream.on('error', (err) => {
                    reject(err)
                })
                writeStream.on('finish', () => {
                    resolve()
                })
            })
        })

        Promise.all(filePromises)
            .then(() => {console.log('hello'); next()})
            .catch((err) => next(new BadRequestError(err)))
    })
}