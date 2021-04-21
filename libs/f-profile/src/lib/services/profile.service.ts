import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { MemberInterface } from '@full/f-profile'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	getMesSchema = gql`
		mutation {
			getMes {
				message
			}
		}
	`

	getProfileSDatachema = gql`
		query {
			getProfileData {
				user {
					name
					email
					date
					imageSrc
					job
				}
				members {
					_id
					name
					who 
					date
				}
			}
		}
	`

	createMemberSchema = gql`
		mutation(
			$name: String!
			$who: String! 
			$date: DateTime!
		){
			createMember(
				member: {
					name: $name
					who: $who
					date: $date
				}
			) {
				message
			}
		}
	`

	saveImgOnUserSchema = gql`
		mutation($imageSrc: String!) {
			saveImgSrc(imageSrc: $imageSrc) {
				message
			}
		}
	`

	changeUserDataSchema = gql`
		mutation(
			$name: String!
			$job: String!
			$date: DateTime!
		) {
			changeUserData(newData: {
				name: $name
				job: $job
				date: $date
			}) {
				message
			}
		}
	`

	deleteMemberSchema = gql`
		mutation($id: String!) {
			deleteMember(id: $id) {
				message
			}
		}
	`
	
	constructor(
		private apollo: Apollo,
		private http: HttpClient
	) { }

	getProfileData() {
		return this.apollo.watchQuery({
			query: this.getProfileSDatachema
		}).valueChanges
	}

	uplaodImg(img: File): Observable<string> {
		const formData = new FormData()
		if(img) {
			formData.append('image', img, img.name)
		}

		return this.http.post<string>('http://localhost:3000/api/upload', formData)
	}

	saveImgOnUser(imageSrc: string) {
		return this.apollo.mutate({
			mutation: this.saveImgOnUserSchema,
			variables: {imageSrc}
		})
	}

	createMember(member: MemberInterface) {
		return this.apollo.mutate({
			mutation: this.createMemberSchema,
			variables: member,
			refetchQueries: [
				{query: this.getProfileSDatachema}
			]
		})
	}

	deleteMember(id) {
		return this.apollo.mutate({
			mutation: this.deleteMemberSchema,
			variables: {id},
			refetchQueries: [
				{query: this.getProfileSDatachema}
			]
		})
	}

	changeUserData(newDate) {
		return this.apollo.mutate({
			mutation: this.changeUserDataSchema,
			variables: newDate,
			refetchQueries: [
				{query: this.getProfileSDatachema}
			]
		})
	}
}