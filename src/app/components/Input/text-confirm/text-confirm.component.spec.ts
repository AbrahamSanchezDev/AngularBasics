import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConfirmComponent } from './text-confirm.component';

describe('TextConfirmComponent', () => {
  let component: TextConfirmComponent;
  let fixture: ComponentFixture<TextConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
