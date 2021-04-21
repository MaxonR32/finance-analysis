import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType() 
export class GlobalMessageModel {
	@Field(type => String)
	message: string
}