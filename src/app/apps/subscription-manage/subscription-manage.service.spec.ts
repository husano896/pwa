import { TestBed } from '@angular/core/testing';

import { SubscriptionManageService } from './subscription-manage.service';

describe('SubscriptionManageService', () => {
  let service: SubscriptionManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
