import { Injectable } from '@angular/core'
import { Apollo, QueryRef } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
	providedIn: 'root'
})
export class ListService {


	
	constructor(private apollo: Apollo) {}

	public getListSchema = gql`
		query {
			getList {
				quantityMoney
				profit
				date
				comment 
				member
				memberName
			}
		}
	`

	getListSchemaLive = gql`
		subscription  {
			getListLive {
				message			
			}
		}
	`
	// quantityMoney
	// 			profit
	// 			date
	// 			comment 
	// 			member
	// 			memberName
	// listQuery: QueryRef<any>;

	getList() {
		return this.apollo.watchQuery({
			query: this.getListSchema
		})
	}

	getListLive() {
		return this.getListSchemaLive
	}

}