import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSourceCodeComponent } from './view-source-code.component';

describe('ViewSourceCodeComponent', () => {
  let component: ViewSourceCodeComponent;
  let fixture: ComponentFixture<ViewSourceCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSourceCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSourceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Open the window with the link', () => {
    component.link = 'www.google.com';
    spyOn(window, 'open');
    component.openLink();
    expect(window.open).toHaveBeenCalled();
  });
});
