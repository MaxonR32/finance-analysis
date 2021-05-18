import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {
	constructor(private apollo: Apollo) {}

	getAnalyticsDataSchema = gql`
		query {
			getAnalyticsData {
				globalValue {
					globalProfitValue
					globalConsumValue
				}
				valueMembers {
					member
					profitValue
					consumValue
				}
			}
		}
	`	
	getChartMemberSchema = gql`
		query GetChartMember($month: Int!){
			getChartMember(month: $month) {
				member {
					name
				}
				actionData
				color
			}
		}
	`

	getAnalyticsData() {
		return this.apollo.watchQuery({
			query: this.getAnalyticsDataSchema 
		}).valueChanges
	}

	getChartMember(month) {
		return this.apollo.watchQuery({
			query: this.getChartMemberSchema,
			variables: {
				month
			},
			errorPolicy: 'all'
		}).valueChanges
	}
}