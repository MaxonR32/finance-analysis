import { Field, ObjectType } from '@nestjs/graphql'
import { MemberModel } from '@full/b-profile'

@ObjectType()
export class UserModel {
	@Field(type => String)
	name: string

	@Field(type => String)
	email: string

	@Field(type => String)
	job: string

	@Field(type => Date)
	date: Date

	@Field(type => String)
	password: string

	@Field(type => String)
	imageSrc: string
}