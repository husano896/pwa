import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurdrinksbarComponent } from './furdrinksbar.component';

describe('FurdrinksbarComponent', () => {
  let component: FurdrinksbarComponent;
  let fixture: ComponentFixture<FurdrinksbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurdrinksbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurdrinksbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
