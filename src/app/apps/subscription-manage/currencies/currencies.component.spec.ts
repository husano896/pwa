import { SubscriptionManageService } from './../subscription-manage.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrenciesComponent } from './currencies.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from '@shared/firebase.module';

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesComponent],
      imports: [
        // WebServ & route 依賴
        RouterTestingModule,

        // 自身服務依賴
        HttpClientModule,
        FirebaseModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        // 自身服務依賴
        SubscriptionManageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
