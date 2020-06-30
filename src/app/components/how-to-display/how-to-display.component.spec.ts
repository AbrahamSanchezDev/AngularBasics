import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToDisplayComponent } from './how-to-display.component';
import { HttpClientModule } from '@angular/common/http';
import { TopicControlService } from 'src/app/service/topic/topic-control.service';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';

describe('HowToDisplayComponent', () => {
  let component: HowToDisplayComponent;
  let fixture: ComponentFixture<HowToDisplayComponent>;

  const topic = new TopicObjModule();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HowToDisplayComponent],
      imports: [HttpClientModule],
      providers: [TopicControlService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToDisplayComponent);
    component = fixture.componentInstance;
    component.repaint = () => {
      console.log('Re Paint it');
    };
    fixture.detectChanges();
    spyOn(console, 'log');
    topic.title = 'Title';
    topic.description = 'Description';
    topic.text = 'Text';
    topic.content = [{ data: TopicDataType.SimpleText, text: 'Content Text' }];

    component.topic = topic;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //Test register
  it('should call Call on the functions', () => {
    component.repaint();

    spyOn(component, 'onSelectedHowTo');
    spyOn(component, 'onClose');

    component.topicControl.onSelected.emit(null);
    component.topicControl.onSearch.emit('');

    expect(component.onSelectedHowTo).toHaveBeenCalled();
    expect(component.onClose).toHaveBeenCalled();
  });
  //Test getContent
  it('should return the topic content', () => {
    expect(component.getContent()).not.toEqual(undefined);
  });
  //Test getTopicText
  it('should return the saveHtml for the topic', async(() => {
    component.onSelectedHowTo(topic);
    setTimeout(() => {
      expect(component.getTopicText()).not.toEqual(undefined);
    });
  }));
  //Test getContentText
  it('should return the text of the content', () => {
    expect(component.getContentText(null)).toEqual('');
    expect(component.getContentText(topic.content[0])).toEqual(
      topic.content[0].text
    );
  });
  //Test getType
  it('should return the type of the content', () => {
    expect(component.getType(topic.content[0])).toEqual('SimpleText');
  });
  //Test getType
  it('should Remove the topic', async(() => {
    component.onClose();
    expect(component.showUi).toBeFalse();
  }));
});
