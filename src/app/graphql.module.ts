import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthenticationService } from './core/services/authentication.service';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink, authenticationService: AuthenticationService): ApolloClientOptions<any> {

  authenticationService.checkAuthentication();

  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `token ${token}`
  });

  return {
    link: httpLink.create({ uri, headers }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthenticationService],
    },
  ],
})
export class GraphQLModule { }
