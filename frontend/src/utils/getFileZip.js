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
          const fileName = file.name;
          const fileExtension = fileName.split('.').pop();

          let mimeType;
          switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
              mimeType = 'image/jpeg';
              break;
            case 'png':
              mimeType = 'image/png';
              break;
            default:
              mimeType = 'application/octet-stream';
              break;
          }

          // Создание объекта Blob с правильным типом MIME
          const blobWithMimetype = new Blob([blob], { type: mimeType });

          // Обработка каждого файла в архиве (blob)
          if (relativePath.indexOf("fileMRT") >= 0) {
            // Сохранение URL-ссылки на файлMRT
            fileMRT = URL.createObjectURL(blobWithMimetype);
          } else if (relativePath.indexOf("fileKT") >= 0) {
            // Сохранение URL-ссылки на файлKT
            fileKT = URL.createObjectURL(blobWithMimetype);
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