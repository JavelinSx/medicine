const path = require('path')
const fs = require('fs').promises;

module.exports.cleanDir = async (req, res, next) => {
    const { fileKT, fileMRT, patientId, _id } = req.body;

    const folderPath = path.resolve('uploads', patientId, _id);
    let isFileMRTProcessed = false;
    let isFileKTProcessed = false;

    try {
        if (fileMRT && fileMRT.includes(patientId)) {
            if (fs.existsSync(folderPath) && (await fs.lstat(folderPath)).isDirectory()) {
                const files = await fs.readdir(folderPath);
                await Promise.all(files.map(file => fs.unlink(path.join(folderPath, file))));
            }
            isFileMRTProcessed = true;
        }

        if (fileKT && fileKT.includes(patientId)) {
            if (fs.existsSync(folderPath) && (await fs.lstat(folderPath)).isDirectory()) {
                const files = await fs.readdir(folderPath);
                await Promise.all(files.map(file => fs.unlink(path.join(folderPath, file))));
            }
            isFileKTProcessed = true;
        }

        if (isFileMRTProcessed && isFileKTProcessed) {
            next();
        }
    } catch (err) {
        next(err);
    }
};
