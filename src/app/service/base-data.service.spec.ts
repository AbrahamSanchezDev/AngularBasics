import { TestBed, async } from '@angular/core/testing';
import { BaseDataService } from './base-data.service';
import { TopicObjModule } from '../model/topic-obj/topic-obj.module';
import { HttpClientModule } from '@angular/common/http';

export class BaseMuckClass extends BaseDataService<TopicObjModule> {
  jsonPath: string;
  fileNames: string[];
  firstPlaceObj(data: TopicObjModule): boolean {
    return false;
  }
  initData(data: TopicObjModule): TopicObjModule {
    return data;
  }
  matchTopic(topic: TopicObjModule, keyword: string): boolean {
    return topic.title.includes(keyword);
  }
}
describe('BaseDataService', () => {
  let service: BaseMuckClass;
  const topic = new TopicObjModule();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: [BaseMuckClass],
    }).compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseMuckClass);
    // spyOn(console, 'log');
    topic.title = 'Title use angular';
    topic.description = 'Description';
    topic.text = 'Text';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get getJsonData the data', () => {
    let data = service.getJsonData();
    expect(data).not.toEqual(null);
    service.allData.push(topic);
    service.allData.push(topic);
    data = service.getJsonData();
    expect(data.length).toBeGreaterThan(0);
  });
  it('should get getData the data', () => {
    service.allData.push(topic);
    service.allData.push(topic);

    let data = service.getData('use');
    expect(service.customData.length).toBeGreaterThan(0);
    expect(data.length).toBe(2);
    data = service.getData('google');
    expect(data.length).toBe(0);
  });
  it('should Call on the search event ', () => {
    spyOn(service.onSearch, 'emit');
    service.search('use');
    expect(service.onSearch.emit).toHaveBeenCalled();
  });
});
