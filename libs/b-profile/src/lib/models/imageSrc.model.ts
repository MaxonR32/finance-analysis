import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType() 
export class ImgSrcModel {
	@Field(type => String)
	message: string
}