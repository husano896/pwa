import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XflyEtherClockComponent } from './xfly-ether-clock.component';

describe('XflyEtherClockComponent', () => {
  let component: XflyEtherClockComponent;
  let fixture: ComponentFixture<XflyEtherClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XflyEtherClockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XflyEtherClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
