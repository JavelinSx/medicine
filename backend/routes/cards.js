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
} = require('../controllers/cards')
const { doctorCheck } = require('../middlewares/roleCheck')
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
    }
  });
  
  // Проверка типов файлов (опционально)
  const fileFilter = (req, file, cb) => {
    // Проверьте расширение или тип файла, если это необходимо
    // Например, можно проверить, что только MRT и KT файлы принимаются
    // иначе вызовите cb(new Error('Invalid file type'), false);
    cb(null, true);
};
  
  // Настройка multer с использованием заданного хранилища и фильтра файлов
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

router.get('/:patientId', getCardsPatient)
router.get('/getFile/:patientId/:cardId', getCardFile)
router.patch('/:patientId/:cardId', upload.fields([
    { name: 'fileMRT', maxCount: 1 },
    { name: 'fileKT', maxCount: 1 }
  ]), updateCardPatientFiles)

router.use(doctorCheck)

router.get('/all/info', getAllCardsPatients)
router.post('/delete/:cardId', deleteCardPatient)
router.post('/:patientId', createCard)


module.exports = router