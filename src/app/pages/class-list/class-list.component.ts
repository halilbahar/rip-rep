import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/core/services/class.service';
import { Class } from 'src/app/shared/models/class.model';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  classes: Class[] = [];

  constructor(
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.classes = this.classService.getClasses();
  }
}
