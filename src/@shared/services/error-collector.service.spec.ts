import { TestBed } from '@angular/core/testing';

import { ErrorCollectorService } from './error-collector.service';

describe('ErrorCollectorService', () => {
  let service: ErrorCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
