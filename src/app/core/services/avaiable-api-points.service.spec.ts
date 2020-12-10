import { TestBed } from '@angular/core/testing';

import { AvaiableApiPointsService } from './avaiable-api-points.service';

describe('AvaiableApiPointsService', () => {
  let service: AvaiableApiPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaiableApiPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
