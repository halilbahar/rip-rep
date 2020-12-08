import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalCommitsWeeklyComponent } from './chart-total-commits-weekly.component';

describe('ChartTotalCommitsWeeklyComponent', () => {
  let component: ChartTotalCommitsWeeklyComponent;
  let fixture: ComponentFixture<ChartTotalCommitsWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTotalCommitsWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTotalCommitsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
