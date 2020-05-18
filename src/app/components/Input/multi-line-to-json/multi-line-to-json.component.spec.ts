import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineToJsonComponent } from './multi-line-to-json.component';

describe('MultiLineToJsonComponent', () => {
  let component: MultiLineToJsonComponent;
  let fixture: ComponentFixture<MultiLineToJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLineToJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
