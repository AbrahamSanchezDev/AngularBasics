import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreatorBaseComponent } from './topic-creator-base.component';

describe('TopicCreatorBaseComponent', () => {
  let component: TopicCreatorBaseComponent;
  let fixture: ComponentFixture<TopicCreatorBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCreatorBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCreatorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
