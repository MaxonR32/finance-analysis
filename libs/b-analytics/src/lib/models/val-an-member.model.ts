import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType() 
export class ValAnMemberModel {
	@Field()
	member: string
	
	@Field()
	profitValue: number
	
	@Field()
	consumValue: number
	
	@Field()
	pourcentConsum: number
}