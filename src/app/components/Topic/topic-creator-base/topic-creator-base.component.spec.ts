import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicCreatorBaseComponent } from './topic-creator-base.component';
import { TopicData } from 'src/app/model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TextFieldComponent } from '../../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';

describe('TopicCreatorBaseComponent', () => {
  let component: TopicCreatorBaseComponent;
  let fixture: ComponentFixture<TopicCreatorBaseComponent>;
  class TopicTest extends TopicCreatorBaseComponent {}

  const data: TopicData = {
    data: TopicDataType.SimpleText,
    text: 'testing',
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicCreatorBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //Title
    component.title = TestBed.createComponent(
      TextFieldComponent
    ).componentInstance;
    //Description
    component.descriptionField = TestBed.createComponent(
      TextFieldComponent
    ).componentInstance;
    //Main topic
    component.mainTopic = TestBed.createComponent(
      InputMultilineComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //Testing getType
  it('should return the type of the given data', () => {
    expect(component.getType(data)).toBe('SimpleText');
  });
  //Testing getContentText
  it('should return the text of the given data', () => {
    expect(component.getContentText(data)).toBe('testing');
  });
  //Testing getContentText
  it('should return the "" since data is null', () => {
    expect(component.getContentText(null)).toBe('');
  });
  //Testing checkText
  it('should check for valid values and create json file if they do', async(() => {
    spyOn(component, 'updateTopicData');
    fixture.whenStable().then(() => {
      component.checkText();
      let errorText = component.getErrorText();
      expect(errorText).toBe('Please add a title');
      //Make the data valid
      component.title.myText = 'Title Test Data';
      component.checkText();
      expect(component.updateTopicData).toHaveBeenCalled();
    });
  }));
  //Testing updateTopicData
  it('should update the data based on the child components', () => {
    component.title.myText = 'Title Text';
    component.descriptionField.myText = 'Description Text';
    component.mainTopic.content = 'Main Topic Content';

    component.updateTopicData();
    expect(component.topic.title).toBe('Title Text');
    expect(component.topic.description).toBe('Description Text');
    expect(component.topic.text).toBe('Main Topic Content');
  });

  //Testing getTopicName  getTopicDescription getIntroText
  it('should return the correct getters', async(() => {
    const name = 'Title';
    const description = 'Description';
    const introText = 'Intro';
    fixture.whenStable().then(() => {
      expect(component.getTopicName()).toContain(name);
      expect(component.getTopicDescription()).toContain(description);
      expect(component.getIntroText()).toContain(introText);
    });
  }));
});
