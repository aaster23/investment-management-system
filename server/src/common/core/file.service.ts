import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { v4 } from 'uuid';
import { contentType } from 'mime-types';

@Injectable()
export class FileService {

  static fileLimit(files: number, fileSize: number) {
    return {
      files,
      fileSize,
    };
  }

  static storage(path: string[]) {
    return diskStorage({
      destination: (req, file, cb) => cb(null, join('.', ...path)),
      filename: (req, file, cb) => cb(null, `${v4().replace(/-/g, '')}${extname(file.originalname)}`),
    });
  }

  static fileFilter(req: any, file, cb, ...extensions: string[]) {
    // Different types of extensions
    // const ext = contentType(file.mimetype);
    // const ext1 = file.mimetype;

    const ext = extname(file.originalname);
    if (!extensions.includes(ext)) {
      return cb(new Error('Extension not allowed'), false); // FileInterceptor is completely ignoring this.
    }
    return cb(null, true);
  }
}
