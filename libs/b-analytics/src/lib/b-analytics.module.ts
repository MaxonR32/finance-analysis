import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Member, MemberSchema } from '@full/b-profile'
import { Action, ActionSchema } from '@full/b-list'
import { AnalyticsService } from './analytics.service'
import { AnalyticsResolver } from './analytics.resolver'

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Member.name, schema: MemberSchema},
			{name: Action.name, schema: ActionSchema},
		])
	],
  	providers: [AnalyticsResolver, AnalyticsService],
})
export class BAnalyticsModule {}
