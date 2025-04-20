import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();
const storage = new Storage({
  projectId: 'notenest-3c0e9',
  keyFilename: './serviceAccountKeyNotenest.json',
});

const bucket = storage.bucket('gs://notenest-3c0e9.appspot.com');

/**
 * Subir el archivo a Firebase Storage
 * file objeto que sera almacenado en Firebase Storage
 **/
const uploadToFirebase = (
  file: Express.Multer.File,
  pathImage: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (pathImage) {
      if (pathImage != null || pathImage != undefined) {
        const fileUpload = bucket.file(`${pathImage}`);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: 'image/png',
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
          resumable: false,
        });

        blobStream.on('error', (error) => {
          console.log('Error al subir archivo a firebase', error);
          reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
          const url = format(
            `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`,
          );
          console.log('URL DE CLOUD STORAGE ', url);
          resolve(url); // 🔹 TypeScript ahora sabe que devuelve un string
        });

        blobStream.end(file.buffer);
      }
    }
  });
};

export default uploadToFirebase;
