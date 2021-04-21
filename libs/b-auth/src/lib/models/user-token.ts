import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user'
import { UserDto } from '../dto/user.dto'

@ObjectType()
export class UserToken {
	@Field()
	token: string

	@Field(type => UserModel)
	user: UserModel
}