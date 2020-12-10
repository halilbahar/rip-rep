import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class } from 'src/app/shared/models/class.model';
import { UserQuery } from 'src/app/shared/models/user-query.model';

@Injectable({
  providedIn: 'root'
})
export class GithubGraphqlApiService {

  constructor(
    private apollo: Apollo
  ) { }

  getStudentsData(clazz: Class): Observable<UserQuery[]> {
    const query = gql`
      query Student($username: String!) {
        user(login: $username) {
          login
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    const queries: Observable<ApolloQueryResult<UserQuery>>[] = [];

    for (const student of clazz.students) {
      const graphqlQuery = this.apollo.query<UserQuery>({ query, variables: { username: student.username } });
      queries.push(graphqlQuery);
    }

    return forkJoin(queries).pipe(
      map(query => query.map(apolloQuery => apolloQuery.data))
    );
  }
}
