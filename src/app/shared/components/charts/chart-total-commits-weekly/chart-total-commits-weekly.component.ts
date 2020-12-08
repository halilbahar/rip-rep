import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserQuery } from 'src/app/shared/models/user-query.model';

@Component({
  selector: 'app-chart-total-commits-weekly',
  templateUrl: './chart-total-commits-weekly.component.html',
  styleUrls: ['./chart-total-commits-weekly.component.scss']
})
export class ChartTotalCommitsWeeklyComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let firstDay = 0;
    const dailyContributions = [0, 0, 0, 0, 0, 0, 0];

    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      // console.log(query);
      // Reverse the weeks so the beginning is this the current week
      const reversedWeeks = [...weeks].reverse();

      // We want to get the last 7 days of contribution. Itterate over the last weeks
      let count = 0;
      for (const week of reversedWeeks) {
        const reversedDays = [...week.contributionDays].reverse();
        for (const day of reversedDays) {
          if (count === 7) { break }
          if (!firstDay && count === 0) {
            firstDay = new Date(day.date).getDay();
          }

          dailyContributions[count] += day.contributionCount;
          count++;
        }
      }
    }

    // With the first day, count back 7 days and get the weekday names
    let currentDayIndex = firstDay;
    const weekdayLabels = [];
    for (let i = 0; i < 7; i++) {
      weekdayLabels.push(days[currentDayIndex]);
      currentDayIndex--;
      if (currentDayIndex === -1) { currentDayIndex = 6 }
    }
    // Reverse both label and data so the current day is the last value
    weekdayLabels.reverse();
    dailyContributions.reverse();

    this.barChartLabels.push(...weekdayLabels);
    this.barChartData.push({
      data: dailyContributions,
      label: 'count'
    })
  }
}
