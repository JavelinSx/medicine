export const convertBlobToFile = (blobUrl) => {
  return fetch(blobUrl)
    .then(response => response.blob())
    
    .then(blob => {
      const lastModified = blob.lastModified;
      const lastModifiedDate = blob.lastModifiedDate;
      const fileName = blobUrl.name; // Имя файла из свойства name
      const file = new File([blob], fileName, { type: blob.type, lastModified, lastModifiedDate });
      return file;
    });
}
