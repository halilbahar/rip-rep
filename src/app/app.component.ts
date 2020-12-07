import { Component, OnInit } from '@angular/core';
import { GithubGraphqlApiService } from './core/services/github-graphql-api.service';
import { Class } from './shared/models/class.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rip-rep';

  constructor(
    private graphql: GithubGraphqlApiService
  ) { }

  ngOnInit(): void {
    this.graphql.getStudentsData({} as Class);
  }
}
