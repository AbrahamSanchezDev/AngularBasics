import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicSimpleCreatorComponent } from './topic-simple-creator.component';
import { InUseMaterialModule } from 'src/app/material-module';
import { TextFieldComponent } from '../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../Input/input-multiline/input-multiline.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { HttpClientModule } from '@angular/common/http';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';

describe('TopicSimpleCreatorComponent', () => {
  let component: TopicSimpleCreatorComponent;
  let fixture: ComponentFixture<TopicSimpleCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicSimpleCreatorComponent],
      imports: [InUseMaterialModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSimpleCreatorComponent);
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

    //Preview
    component.preview = TestBed.createComponent(
      HowToDisplayComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should do preview of the topic', () => {
    component.doPreview();
    let error = component.getErrorText();
    expect(error).not.toBe('');
    //Working title and content
    component.topic.title = 'Title';
    component.mainTopic.content = 'Content';
    component.doPreview();
    error = component.getErrorText();
    expect(error).toBe('');
  });

  it('should format the topic text if it is valid', () => {
    spyOn(component.httpText, 'formatAllText');
    component.topic.text = 'This: [code] some code [/code]';
    component.formatTopicText();
    expect(component.httpText.formatAllText).toHaveBeenCalled();
    expect(component.topic.text).not.toContain('[code]');
  });
  it('should not format the topic text since is not valid', () => {
    spyOn(component.httpText, 'formatAllText');
    component.topic.text = '';
    component.formatTopicText();
    expect(component.httpText.formatAllText).not.toHaveBeenCalled();
  });
  it('should Be called by the input select when the json file was selected', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    let topicObj: TopicObjModule = new TopicObjModule();
    topicObj.title = 'Tit';
    topicObj.description = 'Des';
    topicObj.text = 'Some Text';
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', [
      'readAsText',
      'onload',
    ]);
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);
    component.onChange(mockEvt as any);
    expect((window as any).FileReader).toHaveBeenCalled();

    expect(mockReader.readAsText).toHaveBeenCalled();
  });
  it('should Fill the inputs with some testing text', () => {
    component.testingData();
    expect(component.title.myText).not.toEqual('');
    expect(component.descriptionField.myText).not.toEqual('');
    expect(component.mainTopic.content).not.toEqual('');
  });
});
