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

  constructor(private colorgen: ColorGeneratorService) { }

  ngOnInit(): void {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();

    this.barChartColor = [{
      backgroundColor: this.colorgen.getSameColor(12)
    }];

    type UserContribution = { user: string, months: { month: number, contributions: number }[] };
    const contributions: UserContribution[] = [];

    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      const reversedWeeks = [...weeks].reverse();

      let currentMonth: number | null = null;
      let currentContributions = 0;
      let currentUser: UserContribution = {
        months: [],
        user: query.user.login
      };

      week:
      for (const [i, week] of reversedWeeks.entries()) {
        const reversedDays = [...week.contributionDays].reverse();
        
        for (const day of reversedDays) {
          const date = new Date(day.date);
          const month = date.getMonth();

          if (currentMonth == null) {
            currentMonth = month;
          } else if (currentMonth != month || i === reversedWeeks.length - 1) {
            const tempMonth = currentMonth;
            currentMonth = month;

            const lastDayDate = new Date(date);
            lastDayDate.setDate(date.getDate() - 1);


            if (now.getFullYear() - 1 === lastDayDate.getFullYear() && now.getMonth() === currentMonth && now.getMonth() === tempMonth) {
              continue week;
            }

            currentUser.months.push({
              month: tempMonth,
              contributions: currentContributions
            });
            currentContributions = 0;
          }

          currentContributions += day.contributionCount;
        }
      }
      if (currentUser.user === 'halilbahar') {
        console.log(currentUser.months);

      }
      contributions.push(currentUser);
    }



    const monthlyContributions = contributions.flatMap(contribution => contribution.months);
    const monthlyContributionsArray: number[] = [];
    for (let i = 0; i < 12; i++) {
      const currentContributions = monthlyContributions
        .filter(contribution => contribution.month === i)
        .map(contribution => contribution.contributions)
        .reduce((current: number, value: number) => current + value, 0);

      monthlyContributionsArray.push(currentContributions);
    }

    let currentMonth = new Date().getMonth();
    const monthLabels: string[] = [];
    for (let i = 0; i < 12; i++) {
      monthLabels.push(months[currentMonth]);
      currentMonth++;
      if (currentMonth === 12) {
        currentMonth = 0;
      }
    }

    monthLabels.push(monthLabels.shift() as string)
    monthlyContributionsArray.push(monthlyContributionsArray.shift() as number)
    this.barChartLabels.push(...monthLabels)
    this.barChartData.push({
      data: monthlyContributionsArray,
      label: "Commits"
    });
  }
}
