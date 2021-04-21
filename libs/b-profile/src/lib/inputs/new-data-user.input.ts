import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewDataUserInput {
	@Field()
	name: string

	@Field()
	job: string

	@Field()
	date: Date
}