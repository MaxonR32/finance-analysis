import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class MemberModel {
	@Field(type => ID)
	_id: ObjectId

	@Field(type => String)
	name: string

	@Field(type => String)
	who: string

	@Field(type => Date)
	date: Date

	@Field(type => ID)
	user: ObjectId
}