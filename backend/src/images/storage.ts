import { diskStorage } from 'multer';

const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  callback(null, `${Date.now()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
