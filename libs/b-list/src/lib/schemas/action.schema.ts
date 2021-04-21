import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'
import { GraphQLISODateTime, ID } from '@nestjs/graphql';

export type ActionDocument = Action & Document

@Schema()
export class Action {

	@Prop()
	name: string

	@Prop()
	member: ObjectId

	@Prop()
	date: Date

	@Prop()
	user: ObjectId

	@Prop()
	comment: string

	@Prop({required: true})
	quantityMoney: number

	@Prop()
	profit: boolean

	@Prop()
	memberName: string
}

export const ActionSchema = SchemaFactory.createForClass(Action)