// middlewares/multer.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Указываем путь до папки, куда сохранять файлы
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Генерируем уникальное имя файла
  },
});
const upload = multer({ storage: storage });
const getFiles = upload.fields([
{ name: 'fileMRT', maxCount: 1 },
{ name: 'fileKT', maxCount: 1 }
]);

module.exports.files = (req, res, next) => {

    getFiles(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        next(err);
        } else if (err) {
        // An unknown error occurred when uploading.
        next(err);
        }
        console.log(storage.destination)
        console.log(storage.filename)

        next();
        // Everything went fine.
    });
};
