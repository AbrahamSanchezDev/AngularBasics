import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTextToolComponent } from './topic-text-tool.component';

describe('TopicTextToolComponent', () => {
  let component: TopicTextToolComponent;
  let fixture: ComponentFixture<TopicTextToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicTextToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTextToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
