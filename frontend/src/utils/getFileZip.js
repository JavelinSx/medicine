import JSZip from 'jszip';

export const getFileZip = (data) => {
    const zip = new JSZip();
    return zip.loadAsync(data)
      .then((zip) => {
        const filePromises = [];
        let fileMRT = '';
        let fileKT = '';
  
        zip.forEach((relativePath, file) => {
          const filePromise = file.async('blob').then((blob) => {
            // Обработка каждого файла в архиве (blob)
            if (relativePath.indexOf("fileMRT") >= 0) {
              // Сохранение URL-ссылки на файлMRT
              fileMRT = URL.createObjectURL(blob);
            } else if (relativePath.indexOf("fileKT") >= 0) {
              // Сохранение URL-ссылки на файлKT
              fileKT = URL.createObjectURL(blob);
            }
  
            return { relativePath, blob };
          });
  
          filePromises.push(filePromise);
        });
  
        return Promise.all(filePromises).then(() => {
          return { fileMRT, fileKT };
        });
      });
  };