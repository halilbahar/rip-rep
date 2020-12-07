import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Class } from 'src/app/shared/models/class.model';
import { UserQuery } from 'src/app/shared/models/user-query.model';
import { ClassService } from '../services/class.service';
import { GithubGraphqlApiService } from '../services/github-graphql-api.service';

@Injectable({ providedIn: 'root' })
export class UserQueryResolver implements Resolve<UserQuery[]> {

  constructor(
    private classService: ClassService,
    private githubGraphqlApiService: GithubGraphqlApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserQuery[]> {

    const name = route.params.name;
    const clazz = this.classService.getClassByName(name);

    return this.githubGraphqlApiService.getStudentsData(clazz as Class);
  }
}
