import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiaMinorComponent } from './asiaminor.component';

describe('AsiaMinorComponent', () => {
  let component: AsiaMinorComponent;
  let fixture: ComponentFixture<AsiaMinorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsiaMinorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsiaMinorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
