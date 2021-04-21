import { Injectable } from '@angular/core'
import { BehaviorSubject } from "rxjs"
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	loginSchema = gql`
		query Login($email: String!, $password: String!) {
			login(input: {email: $email, password: $password}) {
				token
			}
		}
	`

  registerSchema = gql`
    mutation Register(
      $email: String!,
      $name: String!,
      $password: String!,
      $date: Date!,
    ) {
      register(input: {
        email: $email,
        name: $name,
        password: $password,
        date: $date
      }) {
        token
      }
    }
  `

	resData: any
	token: string

	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  	constructor(
      private apollo: Apollo,
      ) {
  		if(localStorage.getItem('auth-token')) {
  			this.isAuthenticated.next(true)
  		} else {
  			this.isAuthenticated.next(false)
  		}
  	}

  	login(input) {
  		return this.apollo.watchQuery({
  			query: this.loginSchema,
  			variables: input
  		}).valueChanges
  	}

  	register(input) {
      this.apollo.mutate({
        mutation: this.registerSchema,
        variables: input
      }).subscribe()
  	}

  	logout() {
  		localStorage.removeItem("auth-token")
  		this.isAuthenticated.next(false);
  	}

  	isAuthenticatedMetod(): boolean {
  		return !!localStorage.getItem('auth-token')
  	}

  	setToken(token): string {
  		return this.token = token
  	}
    getToken(): string {
      return this.token
    }
}
