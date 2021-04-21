import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { ProfileResolver } from './profile.resolver'
import { ProfileService } from './profile.service'
import { User, UserSchema } from '@full/b-auth'
import { Member, MemberSchema } from './schemas/member.schema' 

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: User.name, schema: UserSchema}, 
			{name: Member.name, schema: MemberSchema}
		]),
		MulterModule.register({
			dest: './uploads'
		}),
	],
	providers: [ProfileResolver, ProfileService]
})

export class BProfileModule {}