import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultilineComponent } from './input-multiline.component';

describe('InputMultilineComponent', () => {
  let component: InputMultilineComponent;
  let fixture: ComponentFixture<InputMultilineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMultilineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMultilineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
