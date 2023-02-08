import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from './../../../@shared/firebase.module';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SubscriptionManageService } from './subscription-manage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubscriptionManageService', () => {
  let service: SubscriptionManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpClient依賴
        HttpClientModule,
        // Firebase依賴
        FirebaseModule,
        // WebServ 依賴
        RouterTestingModule,
        // snackBar依賴
        MatSnackBarModule
      ],
      providers: [
        SubscriptionManageService
      ]
    });
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
    console.log(service.currency, service.currency['USDTWD']);
    expect(service.exchangeCurrency('USD', 'TWD', 1)).toBeCloseTo(30)
  })
  it('驗算：30 TWD → 90 JPY', () => {
    expect(service.exchangeCurrency('TWD', 'JPY', 30)).toBeCloseTo(90)
  })

  it('轉換不存在的貨幣', () => {
    expect(service.exchangeCurrency('ABC', 'DEF', 114514)).toBeCloseTo(0)
  })
});
