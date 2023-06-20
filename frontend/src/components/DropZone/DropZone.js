import { file } from 'jszip';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import './DropZone.css';

const DropZone = ({ onChange, validate }) => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [namesFiles, setNamesFiles] = useState([])
  const onDrop = useCallback((acceptedFiles) => {

    setFiles(acceptedFiles.map(file => {
      const extension = file.name.split('.').pop()
      return Object.assign(file, {
        id: uuidv4(),
        preview: URL.createObjectURL(file),
        extension: extension,
      })
    }))

    setNamesFiles([])
    setErrors([]);
  }, [files]); 

  useEffect(() => {
    
    

    onChange(files, namesFiles);
    validate(errors)

  }, [files]);

  useEffect(() => {
    console.log(files)
  },[files])

  // useEffect(() => {
  //   return () => {
  //     files.forEach((file) => {
  //       if (!file.revoked) {
  //         URL.revokeObjectURL(file.preview);
  //       }
  //     });
  //   };
  // }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  const handleNameBlur = (event, fileId) => {
    
    const newName = event.target.value.trim();
    const newErrors = { ...errors };

    if (newName === '') {
      newErrors[fileId] = 'Name cannot be empty';
    } else if (files.some((file) => file.id !== fileId && file.name === newName)) {
      newErrors[fileId] = 'Name must be unique';
    } else {
      delete newErrors[fileId];

      setNamesFiles(prevNamesFiles => {
        const updatedFiles = prevNamesFiles.map(obj => {
          if (obj.fileId === fileId) {
            return { ...obj, nameFile: newName };
          }
          return obj;
        });
      
        if (updatedFiles.some(obj => obj.fileId === fileId)) {
          return updatedFiles;
        } else {
          return [...updatedFiles, { fileId, nameFile: newName }];
        }
      });
      console.log(files.map((file) => namesFiles.filter((nameFile) => nameFile.fileId===file.id)))
    }

    setErrors(newErrors);

    // Обновление ссылок на все файлы при изменении имени
    // setFiles((prevFiles) =>
    //   prevFiles.map((file) =>
    //     file.id === fileId ? { ...file, name: newName, preview: URL.createObjectURL(file.blob) } : file
    //   )
    // );
  };

  const deleteImg = (event, fileId, filePreview) => {
    event.preventDefault();
    URL.revokeObjectURL(filePreview); // Отзываем ссылку на удаляемый файл
  
    setFiles((prevFiles) =>
      prevFiles.filter((file) => {
        return file.id !== fileId;
      })
    );
  };

  const thumbs = files.map((file, index) => (
    <div className='drop-zone__img-container' key={index}>
      <div className='drop-zone__img-inner'>
        <button className='drop-zone__img-delete' 
        onClick={(event) => deleteImg(event, file.id, file.preview)}
        >X</button>
        <input
          type='text'
          defaultValue={file.name}
          onBlur={(event) => handleNameBlur(event, file.id)}
        />
        {errors[file.id] && <span className='drop-zone__img-error'>{errors[file.id]}</span>}
        <img
          className='drop-zone__img'
          
          src={file.preview}
          alt={file.name}

        />
      </div>
    </div>
  ));

  return (
    <section className='drop-zone'>
      <div {...getRootProps({ className: 'drop-zone__container' })}>
        <input {...getInputProps({ onChange })} />
        <p>Переместите сюда файлы изображений</p>
      </div>
      <aside className='drop-zone__collection'>{thumbs}</aside>
    </section>
  );
};

export default DropZone;
