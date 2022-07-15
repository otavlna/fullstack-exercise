import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import multerOptions from './multerOptions';

const options = multerOptions();

@Controller('images')
export class ImagesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', options))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return file.filename;
  }
}
