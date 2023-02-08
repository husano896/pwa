import { FirebaseModule } from './../../../@shared/firebase.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [
        // WebServ依賴
        RouterTestingModule,
        // BottomSheet依賴
        MatBottomSheetModule,
        // Firebase依賴
        FirebaseModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
