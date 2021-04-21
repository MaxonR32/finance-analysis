import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { ObjectId  } from 'mongoose';

@ObjectType()
export class ActionModel {

	@Field({nullable: true})
	member?: string

	@Field()
	date: Date

	@Field()
	user: string

	@Field({nullable: true})
	comment?: string

	@Field()
	quantityMoney: number

	@Field()
	profit: boolean

	@Field({nullable: true})
	memberName?: string
}