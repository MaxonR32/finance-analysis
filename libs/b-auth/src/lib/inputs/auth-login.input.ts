import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthLoginInput {
	@Field(type => String)
	email: string

	@Field(type => String)
	password: string
}