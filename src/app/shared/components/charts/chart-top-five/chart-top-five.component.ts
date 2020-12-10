import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {UserQuery} from 'src/app/shared/models/user-query.model';
import {ColorGeneratorService} from '../../../../core/services/color-generator.service';

@Component({
  selector: 'app-chart-top-five',
  templateUrl: './chart-top-five.component.html',
  styleUrls: ['./chart-top-five.component.scss']
})
export class ChartTopFiveComponent implements OnInit {

  @Input() userQueries: UserQuery[];
  @Input() days: number;
  @Input('label-title') title: string;

  barChartOptions: ChartOptions = {responsive: true, maintainAspectRatio: false};
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];
  barChartColor: Color[];

  constructor(
    private colorGeneratorService: ColorGeneratorService
  ) {
  }

  ngOnInit(): void {
    type LastWeeksUserContribution = { username: string, lastWeeksContribution: number };

    this.barChartColor = [{
      backgroundColor: this.colorGeneratorService.getSameColor(5)
    }];

    const users: LastWeeksUserContribution[] = [];
    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      // Reverse the weeks so the beginning is this the current week
      const reversedWeeks = [...weeks].reverse();

      // We want to get the last x days of contribution. Itterate over the last weeks
      let lastWeeksContributionCount = 0;
      let count = 0;
      for (const week of reversedWeeks) {
        for (const day of week.contributionDays) {
          if (count === this.days) {
            break;
          }
          lastWeeksContributionCount += day.contributionCount;
          count++;
        }
      }

      users.push({
        username: query.user.login,
        lastWeeksContribution: lastWeeksContributionCount
      });
    }

    // Get top 5
    users.sort((a, b) => b.lastWeeksContribution - a.lastWeeksContribution);
    console.log(this.days + ':', [...users]);
    const topFiveUsers = users.splice(0, 5);

    // Fill labels and data
    topFiveUsers.forEach(user => this.barChartLabels.push(user.username));
    this.barChartData.push({
      data: [...topFiveUsers.map(user => user.lastWeeksContribution)],
      label: 'Commits'
    });
  }
}
