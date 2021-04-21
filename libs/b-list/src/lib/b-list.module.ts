import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Action, ActionSchema } from './schemas/action.schema'
import { Member, MemberSchema } from '@full/b-profile'
import { ListService } from './list.service'
import { ListResovler } from './list.resolver'

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Action.name, schema: ActionSchema},
			{name: Member.name, schema: MemberSchema} 
		])
	],
  	providers: [ListResovler, ListService],
  	exports: [],
})
export class BListModule {}
