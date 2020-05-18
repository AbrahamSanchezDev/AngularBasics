import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceObjComponent } from './experience-obj.component';

describe('ExperienceObjComponent', () => {
  let component: ExperienceObjComponent;
  let fixture: ComponentFixture<ExperienceObjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceObjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
