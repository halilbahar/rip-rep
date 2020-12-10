import {Component, Input, OnInit} from '@angular/core';
import {UserQuery} from '../../../models/user-query.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-chart-consistency',
  templateUrl: './chart-consistency.component.html',
  styleUrls: ['./chart-consistency.component.scss']
})
export class ChartConsistencyComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (item) => `${item.yLabel} %`
      }
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];

  days = 30;

  constructor() {
  }

  ngOnInit(): void {
    type UserConsistency = { username: string, consistency: number };
    const users: UserConsistency[] = [];

    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      let daysPassed = 0;
      let daysCommited = 0;

      for (const week of weeks) {
        for (const day of week.contributionDays) {
          if (daysPassed === this.days) {
            break;
          }
          if (day.contributionCount > 0) {
            daysCommited++;
          }
          daysPassed++;
        }
      }

      const consistency = (daysCommited / daysPassed * 100).toFixed(2);

      users.push({
        username: query.user.login,
        consistency
      });
    }

    // Get top 5
    users.sort((a, b) => b.consistency - a.consistency);
    const topFiveUsers = users.slice(0, 5);

    topFiveUsers.forEach(user => this.barChartLabels.push(user.username));
    this.barChartData.push({
      data: [...topFiveUsers.map(user => user.consistency)],
      label: 'Commit Consistency'
    });
  }
}
