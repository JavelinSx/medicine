const multer = require('multer');
const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const {
    createCard,
    getCardsPatient,
    getAllCardsPatients,
    deleteCardPatient,
    updateCardPatientFiles,
    getCardFile,
    deleteCard,
} = require('../controllers/cards')
const { doctorCheck } = require('../middlewares/roleCheck')
const {ERRORS_MESSAGE} = require('../utils/constant')
const BadFile = require('../errors/bad_file');
// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const patientId = req.params.patientId
      const cardId = req.params.cardId
      const pathToDir = path.resolve(__dirname, '..', 'uploads', patientId, cardId);
      fs.mkdir(pathToDir, { recursive: true }, (err) => {
        if (err) {
          // Обработка ошибки создания директории
          console.error(err);
          cb(err)
        }
        cb(null, pathToDir);
      })
    },
    filename: (req, file, cb) => {

      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${file.fieldname}.${fileExtension}`;
      cb(null, fileName);
    },
    // fileFilter: (req, file, cb) => {
    //   // Проверка, является ли поле файлом
    //   if (typeof req.body.fileMRT === 'string') {
    //     // Поле является файлом
    //     cb(null, false);
    //   } else if (typeof req.body.fileKT === 'string') {
    //     // Поле содержит строку
    //     cb(null, false);
    //   } else {
    //     cb(null, true)
    //   }
    // }

  });

  
  // Настройка multer с использованием заданного хранилища и фильтра файлов
  const upload = multer({
    storage: storage,
  }).fields([
    { name: 'fileMRT', maxCount: 1 },
    { name: 'fileKT', maxCount: 1 }
  ]);

router.get('/:patientId', getCardsPatient)
router.get('/getFile/:patientId/:cardId', getCardFile)
router.patch('/:patientId/:cardId', (req, res, next) => {
  upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
          console.log(err)
          next(new BadFile(ERRORS_MESSAGE.badFile.messageDefault))
      }
      next();
  });
} , updateCardPatientFiles)

router.use(doctorCheck)

router.post('/delete/:cardId', deleteCard)
router.get('/all/info', getAllCardsPatients)
router.post('/delete/:cardId', deleteCardPatient)
router.post('/:patientId', createCard)


module.exports = router