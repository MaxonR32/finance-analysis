import { Controller, Post, Req, Body, HttpCode, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { imgFilter } from './file.filter'
import { editImgName } from './file-name.edit'
import { diskStorage } from 'multer'
import { ProfileService } from '@full/b-profile'
import { RestAuthGuard } from '@full/b-auth'
import { UploadService } from './uplaod.service'

@Controller()
export class UploadController {

  constructor(private readonly uploadService: UploadService) {}
  
  @Post('upload')
  @UseInterceptors(
    FileInterceptor("image", {
    storage: diskStorage({
      destination: './uploads',
      filename: editImgName
    }),
    fileFilter: imgFilter
  }))
  uploadSingle(
    @UploadedFile() file
  ) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    }
    return {
      message: 'Img has saved',
      imageSrc: response.filename
    }
  }  
}