import { SubscriptionManageService } from './subscription-manage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from './../../../@shared/firebase.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionManageComponent } from './subscription-manage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SubscriptionManageComponent', () => {
  let component: SubscriptionManageComponent;
  let fixture: ComponentFixture<SubscriptionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionManageComponent],
      imports: [
        // WebServ & route 依賴
        RouterTestingModule,
        // dialog依賴
        MatDialogModule,
        // 自身服務Service依賴
        FirebaseModule,
        MatSnackBarModule,
        HttpClientModule
      ],
      providers: [
        SubscriptionManageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubscriptionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
