import { MatMenuModule } from '@angular/material/menu';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotepadComponent } from './notepad.component';

describe('NotepadComponent', () => {
  let component: NotepadComponent;
  let fixture: ComponentFixture<NotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotepadComponent],
      imports: [
        // WebServ & route 依賴
        RouterTestingModule,
        // 下拉選單依賴
        MatMenuModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
