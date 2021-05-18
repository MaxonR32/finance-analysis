import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType() 
export class GlobalValueModel {
	@Field()
	globalProfitValue: number
	
	@Field()
	globalConsumValue: number
}