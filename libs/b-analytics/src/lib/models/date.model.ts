import { Field, ObjectType } from '@nestjs/graphql'
import { ValAnMemberModel } from './val-an-member.model'
import { GlobalValueModel } from './global-value.model'

@ObjectType() 
export class DateModel {
	@Field()
	day: number
	
	@Field()
	percentBeforeEndMonth: number
}