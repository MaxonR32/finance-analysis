import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { User, UserSchema } from './schemas/user.schema'
import { AuthResolver } from './auth.resovler'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { RestAuthGuard } from './guards/rest-auth.guard'
import { UploadFileModule } from '@full/upload-file'

@Module({
	imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		JwtModule.register({
			secret: 'Nice-secret',
			signOptions: { expiresIn: '3600s' }
		}),
		    forwardRef(() => UploadFileModule ),
	],
  	controllers: [],
  	providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, RestAuthGuard],
  	exports: [],
})
export class BAuthModule {}
