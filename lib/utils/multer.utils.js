import multer from "multer";

import { v4 as uuidV4} from 'uuid';

import path from "path";

import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FilesService {
  
   storage() {
    return multer.diskStorage({
      destination: function (req, file, callback) {
        try {
          const uploadDir = path.join(__dirname, "../../uploads")
          if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          callback(null, './uploads/');
        } catch (error) {
          callback(error, '')
        }
      },
      filename: function (req,file,callback) {
        callback(
          null,
           file.fieldname
           + '-'
           + Date.now()
           + '-'
           + uuidV4()
           + "." 
           + file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
        );
      },
    });
  }

  fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
  }

  uploadUtils() {
    return multer({
      storage: this.storage(),
      fileFilter: this.fileFilter,
    });
  }

 
 
}

export default new FilesService();
