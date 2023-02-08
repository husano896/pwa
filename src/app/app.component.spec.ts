import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from './../@shared/firebase.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // WebServ & route 依賴
        RouterTestingModule,
        // ServiceWorker系列依賴
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: false,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerImmediately'
        }),
        // 翻譯模組依賴
        TranslateModule.forRoot(),
        // Firebase依賴
        FirebaseModule,
        // snackBar依賴
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
