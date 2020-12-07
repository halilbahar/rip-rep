import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-statistic',
  templateUrl: './class-statistic.component.html',
  styleUrls: ['./class-statistic.component.scss']
})
export class ClassStatisticComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
  }
}
