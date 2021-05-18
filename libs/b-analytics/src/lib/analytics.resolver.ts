import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard, CtxUser, UserModel } from '@full/b-auth'
import { AnalyticsService } from './analytics.service'
import { GlobalMessageModel } from '@full/b-profile'
import { AnalyticsModel } from './models/analytics.model'
import { MemberChartModel } from './models/member-chart.model'

@Resolver()
@UseGuards(GqlAuthGuard)
export class AnalyticsResolver {
	
	constructor(private readonly analyticsService: AnalyticsService) {}
	
	@Query(() => AnalyticsModel)
	getAnalyticsData(@CtxUser() user: UserModel) {
		return this.analyticsService.getAnalyticsDataMember(user)
	}

	@Query(() => [MemberChartModel])
	getChartMember(
		@CtxUser() user: UserModel,
		@Args('month',  { type: () => Int }) month: number
	) {
		return this.analyticsService.chartMemberMonth(user, month)
	}
}
