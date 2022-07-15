import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export default () =>
  // Multer upload options
  ({
    // Enable file size limits
    limits: {
      fileSize:
        typeof process.env.MAX_FILE_SIZE_IN_BYTES === 'number'
          ? parseInt(process.env.MAX_FILE_SIZE_IN_BYTES)
          : 5_000_000,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
    // Storage properties
    storage: diskStorage({
      // Destination storage path details
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = process.env.UPLOADED_FILES_DEST ?? 'uploads';
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      // File modification details
      filename: (req: any, file: any, cb: any) => {
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${uuid()}${extname(file.originalname)}`);
      },
    }),
  });
