import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConsistencyComponent } from './chart-consistency.component';

describe('ChartConsistencyComponent', () => {
  let component: ChartConsistencyComponent;
  let fixture: ComponentFixture<ChartConsistencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartConsistencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartConsistencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
