import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStatisticComponent } from './class-statistic.component';

describe('ClassStatisticComponent', () => {
  let component: ClassStatisticComponent;
  let fixture: ComponentFixture<ClassStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
