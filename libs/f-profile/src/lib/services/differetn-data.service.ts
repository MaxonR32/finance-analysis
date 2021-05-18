import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { MemberInterface } from '@full/f-profile'

@Injectable({
	providedIn: 'root'
})
export class DifferentDataService {

	getAnalyticsDataOfMemberSchema = gql`
		query getAnalyticsDataMember {
			getAnalyticsData {
				valueMembers {
					member
					profitValue
				}
			}
		}
	`

	constructor(private apollo: Apollo) {}

	getAnalyticsDataOfMember() {
		return this.apollo.watchQuery({
			query: this.getAnalyticsDataOfMemberSchema
		}).valueChanges
	}

}