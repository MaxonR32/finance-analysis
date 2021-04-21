import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { ObjectId } from 'mongoose';

@InputType()
export class ActionInput {
	@Field(type => String, {nullable: true})
	comment?: string

	@Field(type => Boolean, {nullable: true})
	profit?: boolean

	@Field(type => Int)
	quantityMoney: number

	@Field(type => Date)
	date: Date

	@Field(type => String, {nullable: true})
	member?: string

	@Field(type => String, {nullable: true})
	memberName?: string
}