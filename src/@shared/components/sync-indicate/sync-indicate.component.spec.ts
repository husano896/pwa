import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncIndicateComponent } from './sync-indicate.component';

describe('SyncIndicateComponent', () => {
  let component: SyncIndicateComponent;
  let fixture: ComponentFixture<SyncIndicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncIndicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncIndicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
