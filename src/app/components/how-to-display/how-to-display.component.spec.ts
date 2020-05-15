import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToDisplayComponent } from './how-to-display.component';

describe('HowToDisplayComponent', () => {
  let component: HowToDisplayComponent;
  let fixture: ComponentFixture<HowToDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
