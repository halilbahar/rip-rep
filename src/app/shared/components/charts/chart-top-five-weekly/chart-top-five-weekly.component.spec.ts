import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopFiveWeeklyComponent } from './chart-top-five-weekly.component';

describe('ChartTopFiveWeeklyComponent', () => {
  let component: ChartTopFiveWeeklyComponent;
  let fixture: ComponentFixture<ChartTopFiveWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTopFiveWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTopFiveWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
