import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopScannerComponent } from './shop-scanner.component';

describe('ShopScannerComponent', () => {
  let component: ShopScannerComponent;
  let fixture: ComponentFixture<ShopScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
