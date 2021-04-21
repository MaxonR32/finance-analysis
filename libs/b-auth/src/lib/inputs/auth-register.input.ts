import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthRegisterInput {
	@Field()
	name: string

	@Field()
	password: string

	@Field()
	email: string

	@Field({nullable: true})
	job?: string

	@Field()
	date: Date

	@Field({nullable: true})
	image?: string	
}