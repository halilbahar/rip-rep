import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserQuery } from 'src/app/shared/models/user-query.model';

@Component({
  selector: 'app-class-statistic',
  templateUrl: './class-statistic.component.html',
  styleUrls: ['./class-statistic.component.scss']
})
export class ClassStatisticComponent implements OnInit {

  userQueries: UserQuery[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userQueries = this.route.snapshot.data.userQueries;
  }
}
