import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS } from 'apollo-angular'
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'

const uri = 'http://localhost:3000/graphql'


export function createApollo(httpLink: HttpLink) {
	const token = localStorage.getItem('auth-token')
	const auth = setContext((operation, context) => {
		if(token) {
			return {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		}
	})

	const link = ApolloLink.from([auth, httpLink.create({ uri })])

	const wsClient = new WebSocketLink({
	  uri: `ws://localhost:3000/graphql`,
	  options: {
	    reconnect: true,
	  },
	});


	return {
		link,
		// wsClient,
		cache: new InMemoryCache()
	}
}

@NgModule({
	providers: [{
		provide: APOLLO_OPTIONS,
		useFactory: createApollo,
		deps: [HttpLink]
	}],
  	imports: [CommonModule],
})
export class GqlModule {}
