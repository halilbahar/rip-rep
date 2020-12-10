import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaiableApiPointsService {
  availablePoints: BehaviorSubject<number> = new BehaviorSubject(-1);
  usedPoints: BehaviorSubject<number> = new BehaviorSubject(-1);
  resetTimeStamp: BehaviorSubject<number> = new BehaviorSubject(-1);
}
