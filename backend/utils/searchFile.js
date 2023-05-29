const fs = require('fs')
const path = require('path')
module.exports.searchFile = (dir, fileName) => {
    const files = fs.readdirSync(dir);
  
    for (const file of files) {
      const filePath = path.join(dir, file);
  
      if (fs.statSync(filePath).isFile()) {
        // Проверяем, совпадает ли имя файла без расширения
        const baseName = path.basename(file, path.extname(file));
        if (baseName === fileName) {
          return filePath;
        }
      } else {
        const foundPath = searchFile(filePath, fileName);
        if (foundPath) {
          return foundPath;
        }
      }
    }
  
    return null;
  }