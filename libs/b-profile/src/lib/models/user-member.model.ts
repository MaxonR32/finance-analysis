import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@full/b-auth'
import { MemberModel } from './member.model'

@ObjectType()
export class UserMemberModel {
	@Field(type => UserModel)
	user: UserModel

	@Field(type => [MemberModel])
	members?: MemberModel[]
}