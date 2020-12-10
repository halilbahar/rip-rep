import {Component, Input, OnInit} from '@angular/core';
import {UserQuery} from '../../../models/user-query.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {ColorGeneratorService} from '../../../../core/services/color-generator.service';

@Component({
  selector: 'app-chart-average-commits-daily',
  templateUrl: './chart-average-commits-daily.component.html',
  styleUrls: ['./chart-average-commits-daily.component.scss']
})
export class ChartAverageCommitsDailyComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  pieChartOptions: ChartOptions = {responsive: true, maintainAspectRatio: false};
  pieChartLabels: Label[] = [];
  pieChartType: ChartType = 'doughnut';
  pieChartLegend = true;
  pieChartData: ChartDataSets[] = [];
  pieChartColor: Color[];

  constructor(private colorgen: ColorGeneratorService) {
  }

  ngOnInit(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const contributionsPerWeekday = [0, 0, 0, 0, 0, 0, 0];
    const weekDayCounter = [0, 0, 0, 0, 0, 0, 0];

    this.pieChartColor = [{
      backgroundColor: this.colorgen.getColor(7)
    }];

    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;

      // counting the total amount of contributions per weekday and counting how many of each weekday there are
      for (const week of weeks) {
        for (const day of week.contributionDays) {
          const dayIndex = day.weekday;
          contributionsPerWeekday[dayIndex] += day.contributionCount;
          weekDayCounter[dayIndex]++;
        }
      }
    }

    // calculating the average amount of contributinos per weekday
    const averageContributions = [];
    for (let i = 0; i < contributionsPerWeekday.length; i++) {
      // console.log(`${contributionsPerWeekday[i]} - ${weekDayCounter[i]}`);
      averageContributions[i] = +(contributionsPerWeekday[i] / (weekDayCounter[i] / this.userQueries.length)).toFixed(2);
    }

    // shift arrays so that monday is first
    days.push(days.shift()!);
    averageContributions.push(averageContributions.shift());

    this.pieChartLabels.push(...days);
    this.pieChartData.push({
      data: averageContributions,
      label: 'Commits'
    });
  }
}
