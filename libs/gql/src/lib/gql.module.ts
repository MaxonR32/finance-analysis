import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS } from 'apollo-angular'
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from "@apollo/client/link/error"

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

	const errorLink = onError(({ graphQLErrors, networkError }) => {
	  if (graphQLErrors)
	    graphQLErrors.map(({ message, locations, path }) =>
	      console.log(
	        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
	      )
	    );
	  if (networkError) console.log(`[Network error]: ${networkError}`);
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
		errorLink,
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
