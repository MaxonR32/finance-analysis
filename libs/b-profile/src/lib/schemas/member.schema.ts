import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'
import { GraphQLISODateTime, ID } from '@nestjs/graphql';

export type MemberDocument = Member & Document

@Schema()
export class Member {
	// @Prop(type => ID)
	// _id: ObjectId

	@Prop(type => String)
	name: string

	@Prop(type => String)
	who: string

	@Prop(type => Date)
	date: Date

	@Prop(type => ID)
	user: ObjectId
}

export const MemberSchema = SchemaFactory.createForClass(Member)