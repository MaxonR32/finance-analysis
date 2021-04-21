import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { UploadController } from './uplaod.controller'
import { MulterModule } from '@nestjs/platform-express'
import { ProfileService } from '@full/b-profile'
import { User, UserSchema } from '@full/b-auth'
import { MongooseModule } from '@nestjs/mongoose'
import { BAuthModule, RestAuthGuard } from '@full/b-auth'
import { UploadService } from './uplaod.service'

@Module({
  controllers: [UploadController],
  imports: [
    HttpModule, 
  	// MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  	MulterModule.register({
  		dest: './upload',
	}),
    forwardRef(() => BAuthModule ) 
  ],
  providers: [UploadService],
  exports: [],
})
export class UploadFileModule {}
