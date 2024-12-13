import { TestBed } from '@angular/core/testing';

import { EmployeeResolverService } from './employee-resolver.service';

describe('EmployeeResolverService', () => {
  let service: EmployeeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
