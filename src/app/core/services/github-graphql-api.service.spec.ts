import { TestBed } from '@angular/core/testing';

import { GithubGraphqlApiService } from './github-graphql-api.service';

describe('GithubGraphqlApiService', () => {
  let service: GithubGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
