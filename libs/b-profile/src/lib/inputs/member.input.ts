import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MemberInput {
	@Field()
	name: string

	@Field()
	who: string

	@Field()
	date: Date
}