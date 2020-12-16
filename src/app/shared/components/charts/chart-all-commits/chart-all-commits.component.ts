import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserQuery } from 'src/app/shared/models/user-query.model';

@Component({
  selector: 'app-chart-all-commits',
  templateUrl: './chart-all-commits.component.html',
  styleUrls: ['./chart-all-commits.component.scss']
})
export class ChartAllCommitsComponent implements OnInit {

  @Input() userQueries: UserQuery[];

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      position: 'nearest',
      filter: function (item, data) {
        const dataset = data.datasets![item.datasetIndex!];
        const dataValue = dataset.data![item.index!]!;
        return dataValue <= 0 ? false : true;
      },
      callbacks: {
        title: () => ''
      }
    },
    elements: {
      line: {
        tension: 0
      }
    }
  };
  lineChartLabels: Label[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend = true;
  lineChartData: ChartDataSets[] = [];
  lineChartColors: Color[] = [];

  ngOnInit(): void {
    type StudentContributionDay = {
      login: string,
      data: {
        contributionCount: number,
        date: Date
      }[]
    };

    const studentContributions: StudentContributionDay[] = [];


    for (const query of this.userQueries) {
      const weeks = query.user.contributionsCollection.contributionCalendar.weeks;
      const reversedWeeks = [...weeks].reverse();
      let counter = 0;

      const contribution: StudentContributionDay = {
        login: query.user.login,
        data: []
      };

      // Get the past 30 days. Start from the current day (today)
      for (const week of reversedWeeks) {
        const reversedDays = [...week.contributionDays].reverse();
        for (const day of reversedDays) {
          if (counter >= 30) {
            break;
          }

          contribution.data.push({
            contributionCount: day.contributionCount,
            date: new Date(day.date)
          });

          counter++;
        }
      }

      contribution.data.reverse();
      studentContributions.push(contribution);
    }

    // Get the past 30 days in day-month format
    const labels = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      labels.push(now.toLocaleDateString(navigator.language, { day: 'numeric', month: 'numeric' }));
      now.setDate(now.getDate() - 1);
    }

    labels.reverse();
    this.lineChartLabels.push(...labels);

    // map the array so it is compatible with the chart
    this.lineChartData.push(...studentContributions.map(student => {
      const data = student.data.map(data => data.contributionCount);
      return { data, label: student.login }
    }));
  }
}
