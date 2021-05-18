import { Field, ObjectType } from '@nestjs/graphql'
import { ValAnMemberModel } from './val-an-member.model'
import { GlobalValueModel } from './global-value.model'
import { DateModel } from './date.model'

@ObjectType() 
export class AnalyticsModel {
	@Field(type => [ValAnMemberModel])
	valueMembers?: ValAnMemberModel[]
	
	@Field(type => GlobalValueModel)
	globalValue: GlobalValueModel

	@Field(type => DateModel)
	dataOfDay: DateModel
}