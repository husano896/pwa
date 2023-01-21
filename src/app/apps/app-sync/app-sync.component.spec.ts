import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSyncComponent } from './app-sync.component';

describe('AppSyncComponent', () => {
  let component: AppSyncComponent;
  let fixture: ComponentFixture<AppSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
