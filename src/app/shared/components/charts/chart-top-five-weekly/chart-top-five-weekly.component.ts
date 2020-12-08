import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserQuery } from 'src/app/shared/models/user-query.model';

@Component({
  selector: 'app-chart-top-five-weekly',
  templateUrl: './chart-top-five-weekly.component.html',
  styleUrls: ['./chart-top-five-weekly.component.scss']
})
export class ChartTopFiveWeeklyComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit(): void {
    type LastWeekUserContribution = { username: string, lastWeekContribution: number };

    const users: LastWeekUserContribution[] = [];
    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      const lastWeek = weeks[weeks.length - 1];

      // We want to get the last 7 days of contribution. Best case scene it is sunday and the week has 7 days.
      let lastWeekContributionCount = 0;
      let count = 0;
      for (const day of lastWeek.contributionDays) {
        lastWeekContributionCount += day.contributionCount
        count++;
      }
      // If it is not sunday get the week before that and count the contributions until 7 days are full
      if (count < 7) {
        const weekBefore = weeks[weeks.length - 2];
        for (const day of weekBefore.contributionDays) {
          lastWeekContributionCount += day.contributionCount;

          count++;

          if (count === 7) {
            break;
          }
        }
      }

      users.push({
        username: query.user.login,
        lastWeekContribution: lastWeekContributionCount
      });
    }

    // Get top 5
    users.sort((a, b) => b.lastWeekContribution - a.lastWeekContribution);
    const topFiveUsers = users.slice(0, 5);

    // Fill labels and data
    topFiveUsers.forEach(user => this.barChartLabels.push(user.username));
    this.barChartData.push({
      data: [...topFiveUsers.map(user => user.lastWeekContribution)],
      label: 'Count'
    });
  }
}
