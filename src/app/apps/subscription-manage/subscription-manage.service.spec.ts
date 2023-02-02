import { TestBed } from '@angular/core/testing';

import { SubscriptionManageService } from './subscription-manage.service';

describe('SubscriptionManageService', () => {
  let service: SubscriptionManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionManageService);

    // 假設幣值
    service.currency = {
      'USDJPY': { Exrate: 90, UTC: '2000/1/1' },
      'USDTWD': { Exrate: 30, UTC: '2000/1/1' }
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('驗算：1 USD → 30 TWD', () => {
    expect(service.exchangeCurrency('USD', 'TWD', 1)).toBeCloseTo(30)
  })
  it('驗算：30 TWD → 90 JPY', () => {
    expect(service.exchangeCurrency('TWD', 'JPY', 30)).toBeCloseTo(90)
  })
});
