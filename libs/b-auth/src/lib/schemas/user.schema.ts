import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { MemberDocument, MemberSchema, MemberModel, Member } from '@full/b-profile'
import * as mongoose from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
	@Prop(type => String)
	name: string

	@Prop(type => String)
	email: string

	@Prop(type => String)
	job: string

	@Prop()
	date: Date

	@Prop(type => String)
	token: string

	@Prop()
	tokenExpireAt: number

	@Prop(type => String)
	password: string

	@Prop({
		default: ''
	})
	imageSrc: string
}

export const UserSchema = SchemaFactory.createForClass(User)