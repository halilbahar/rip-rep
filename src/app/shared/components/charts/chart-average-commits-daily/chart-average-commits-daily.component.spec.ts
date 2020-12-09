import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAverageCommitsDailyComponent } from './chart-average-commits-daily.component';

describe('ChartAverageCommitsDailyComponent', () => {
  let component: ChartAverageCommitsDailyComponent;
  let fixture: ComponentFixture<ChartAverageCommitsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAverageCommitsDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAverageCommitsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
