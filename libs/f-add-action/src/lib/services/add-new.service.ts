import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { ActionInterface } from '@full/f-profile'
import { Observable } from 'rxjs'
import { ListService } from '@full/f-list-page'

@Injectable({
	providedIn: 'root'
})
export class AddNewService {

	action: Observable<any>
	
	constructor(
		private apollo: Apollo,
		private listService: ListService
	) {}

	fetchMmeberSchema = gql`
		query {
			getProfileData {
				members {
					_id
					name
				}
			}
		}
	`

	addNewActionSchema = gql`
		mutation AddAction(
			$comment: String
			$profit: Boolean
			$quantityMoney: Int!
			$date: DateTime!
			$member: String
			$memberName: String
		) {
			addAction(action: {
				comment: $comment
				profit: $profit
				quantityMoney: $quantityMoney
				date: $date
				member: $member
				memberName: $memberName
			}) {
				comment
				profit
				quantityMoney
				date
				member
				memberName
			}
		}
	`

	exampleSchema = gql`
		mutation {
			example {
				message
			}
		}
	`

	fetchMember() {
		return this.apollo.watchQuery({
			query: this.fetchMmeberSchema,
		}).valueChanges
	}

	addNewAction(action: ActionInterface) {
		console.log('action', action)
		return this.apollo.mutate({
			mutation: this.addNewActionSchema,
			variables: action,
			refetchQueries: [
				{query: this.listService.getListSchema}
			]
		})
	}

	example() {
		return this.apollo.mutate({
			mutation: this.exampleSchema 
		})
	}
}
