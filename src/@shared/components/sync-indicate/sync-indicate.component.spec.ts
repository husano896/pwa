import { FirebaseModule } from './../../firebase.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncIndicateComponent } from './sync-indicate.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SyncIndicateComponent', () => {
  let component: SyncIndicateComponent;
  let fixture: ComponentFixture<SyncIndicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncIndicateComponent],
      imports: [
        // FirebaseService的依賴
        FirebaseModule,

        // WebService的依賴
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SyncIndicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
