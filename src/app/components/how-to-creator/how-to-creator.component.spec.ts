import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToCreatorComponent } from './how-to-creator.component';

describe('HowToCreatorComponent', () => {
  let component: HowToCreatorComponent;
  let fixture: ComponentFixture<HowToCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
