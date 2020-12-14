import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAllCommitsComponent } from './chart-all-commits.component';

describe('ChartAllCommitsComponent', () => {
  let component: ChartAllCommitsComponent;
  let fixture: ComponentFixture<ChartAllCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAllCommitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAllCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
