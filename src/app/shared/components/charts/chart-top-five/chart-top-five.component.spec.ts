import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopFiveComponent } from './chart-top-five.component';

describe('ChartTopFiveComponent', () => {
  let component: ChartTopFiveComponent;
  let fixture: ComponentFixture<ChartTopFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTopFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTopFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
