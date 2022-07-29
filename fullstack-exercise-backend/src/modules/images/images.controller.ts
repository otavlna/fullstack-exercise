import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import multerOptions from './multerOptions';
import { FileUploadDto } from './images.dto';

const options = multerOptions();

@Controller('images')
export class ImagesController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Image upload endpoint',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file', options))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return file.filename;
  }
}
