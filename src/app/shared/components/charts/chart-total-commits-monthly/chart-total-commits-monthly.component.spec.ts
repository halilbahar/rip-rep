import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalCommitsMonthlyComponent } from './chart-total-commits-monthly.component';

describe('ChartTotalCommitsMonthlyComponent', () => {
  let component: ChartTotalCommitsMonthlyComponent;
  let fixture: ComponentFixture<ChartTotalCommitsMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTotalCommitsMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTotalCommitsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
