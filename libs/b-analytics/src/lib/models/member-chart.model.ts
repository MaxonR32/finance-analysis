import { Field, ObjectType } from '@nestjs/graphql'
import { MemberModel } from '@full/b-profile'
import { ActionModel } from '@full/b-list' 

@ObjectType() 
export class MemberChartModel {
	@Field(type => MemberModel)
	member: MemberModel
	
	@Field(type => [Number])
	actionData?: number[]

	@Field(type => String)
	color?: string
}