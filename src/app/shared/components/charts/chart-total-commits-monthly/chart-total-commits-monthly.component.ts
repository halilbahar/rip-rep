import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserQuery } from 'src/app/shared/models/user-query.model';
import { ColorGeneratorService } from '../../../../core/services/color-generator.service';

@Component({
  selector: 'app-chart-total-commits-monthly',
  templateUrl: './chart-total-commits-monthly.component.html',
  styleUrls: ['./chart-total-commits-monthly.component.scss']
})
export class ChartTotalCommitsMonthlyComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  barChartOptions: ChartOptions = { responsive: true, maintainAspectRatio: false };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];
  barChartColor: Color[];

  constructor(
    private colorgen: ColorGeneratorService
  ) { }

  ngOnInit(): void {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let monthIndex = null;
    let firstMonthIndex = -1;
    // The first element will be the current month and the last element the month before. Everything goes in reverse
    // [0] -> may
    // [1] -> march
    // [11] -> june
    const monthlyContributions: number[] = [];

    this.barChartColor = [{
      backgroundColor: this.colorgen.getSameColor(12)
    }];

    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      // Reverse the weeks so the beginning is this the current week
      const reversedWeeks = [...weeks].reverse();
      let inFirstMonth = true;

      for (const week of reversedWeeks) {
        const reversedDays = [...week.contributionDays].reverse();
        for (const day of reversedDays) {
          const currentMonthIndex = new Date(day.date).getMonth();

          if (currentMonthIndex === firstMonthIndex && !inFirstMonth) {
            break;
          }

          // First itteration, get the intial month
          if (monthIndex == null) {
            monthIndex = currentMonthIndex;
            firstMonthIndex = monthIndex;
          }

          // Check every itteration if the month changed.
          // If so change the index and count the contributions for the next month
          if (currentMonthIndex !== monthIndex) {
            monthIndex = currentMonthIndex;

            if (inFirstMonth && monthIndex !== firstMonthIndex) {
              inFirstMonth = false;
            }
          }

          if (monthlyContributions[monthIndex] == null) {
            monthlyContributions[monthIndex] = day.contributionCount;
          } else {
            monthlyContributions[monthIndex] += day.contributionCount;
          }
        }
      }
    }

    let currentMonthIndex = firstMonthIndex;
    const monthLabel: string[] = [];
    for (let i = 0; i < 12; i++) {
      monthLabel.push(months[currentMonthIndex]);
      currentMonthIndex--;

      if (currentMonthIndex < 0) {
        currentMonthIndex = months.length - 1;
      }
    }
    monthLabel.reverse();

    // shift first element to the end of the array
    monthlyContributions.push(monthlyContributions.shift() as number);

    this.barChartLabels.push(...monthLabel);
    this.barChartData.push({
      data: monthlyContributions,
      label: 'Commits'
    });
  }
}
