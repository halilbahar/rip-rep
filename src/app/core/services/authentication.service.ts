import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { GithubToken } from 'src/app/shared/models/github-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * Checks if a token is stored in the local storage.
   * If not this methods redirects the user to github with the proper client id
   * With that client id github redirect the user with the authentication `code` back to spa.
   * With that `code` we request with a cors proxy the actual token.
   */
  checkAuthentication() {
    this.router.events.subscribe(async event => {
      if (!(event instanceof RoutesRecognized)) { return }
      if (localStorage.getItem('access_token')) { return }

      const { client_id, client_secret, redirect_uri } = environment;
      const code = event.state.root.queryParams.code

      if (!code) {
        const url = 'https://github.com/login/oauth/authorize';
        window.location.href = `${url}?type=user_agent&client_id=${client_id}&redirect_uri=${redirect_uri}`;

      } else {
        const authenticationUrl = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
        const authenticationBody = {
          client_id, client_secret, code, redirect_uri
        };
        const authenticationHeaders = new HttpHeaders({
          Accept: 'application/json',
          'X-Requested-With': window.origin
        });

        const authenticationRequest = this.http.post<GithubToken>(
          authenticationUrl,
          authenticationBody,
          { headers: authenticationHeaders }
        );
        const githubToken = await authenticationRequest.toPromise();
        localStorage.setItem('access_token', githubToken.access_token);
      }
    });
  }
}
