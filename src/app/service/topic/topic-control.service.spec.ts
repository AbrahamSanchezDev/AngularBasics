import { TestBed, async } from '@angular/core/testing';
import { TopicControlService } from './topic-control.service';
import { HttpClientModule } from '@angular/common/http';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';

describe('TopicControlService', () => {
  let service: TopicControlService;
  const topic = new TopicObjModule();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TopicControlService);
    // spyOn(console, 'log');
    topic.title = 'Title use angular';
    topic.description = 'Description';
    topic.text = 'Text';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get testing Topics the data', () => {
    const topics = service.getTopics();
    expect(topics).not.toEqual(null);
  });
  it('should format the given data', () => {
    spyOn(service.httpText, 'formatAllText');
    let model = service.initData(topic);
    expect(model.text).not.toBe('');
    expect(service.httpText.formatAllText).toHaveBeenCalled();
  });
  it('should Check if the given topic should be the first in the list', () => {
    let first = service.firstPlaceObj(topic);
    expect(first).toBeFalse();
  });
  it('should match the topic with the title use', () => {
    let match = service.matchTopic(topic, 'use');
    expect(match).toBeTrue();
    match = service.matchTopic(topic, 'other');
    expect(match).toBeFalse();
  });
});
