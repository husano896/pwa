import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EviatComponent } from './eviat.component';

describe('EviatComponent', () => {
  let component: EviatComponent;
  let fixture: ComponentFixture<EviatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EviatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EviatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
