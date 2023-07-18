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
const { roleCheck } = require('../middlewares/roleCheck')
const { ERRORS_MESSAGE } = require('../utils/constant')
const BadFile = require('../errors/bad_file');
// Настройка хранилища для multer
//в дальнейшем необходимо реализовать более гибку работу с фалами карточки пациента
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { patientId, cardId } = req.params;
    const folderPath = path.resolve(__dirname, '..', 'uploads', patientId, cardId);
    try {
      await fs.promises.mkdir(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (error) {
      if (error.syscall) {
        cb(null, folderPath)
      } else {
        cb(error);
      }
    }
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[1] // 1 - берём вторую часть от массива, содержащую расширение
    const fileName = file.fieldname.concat('.', extension)
    cb(null, fileName);
  },
});


// Настройка multer с использованием заданного хранилища и фильтра файлов
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
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
      next(new BadFile(ERRORS_MESSAGE.badFile.messageDefault))
    }
    next();
  });
}, updateCardPatientFiles)

router.use(roleCheck)

router.get('/all/info', getAllCardsPatients)
router.post('/delete/:cardId', deleteCardPatient)
router.post('/:patientId', createCard)


module.exports = router