import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../Input/input-multiline/input-multiline.component';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicData } from '../../model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
@Component({
  selector: 'app-how-to-creator',
  templateUrl: './how-to-creator.component.html',
  styleUrls: ['./how-to-creator.component.css'],
})
export class HowToCreatorComponent implements OnInit {
  @ViewChild('titleField') title: TextFieldComponent;
  @ViewChild('descriptionField') descriptionField: TextFieldComponent;
  @ViewChild('mainTopic') mainTopic: InputMultilineComponent;

  errorText: string = '';
  topicName: string = 'Title';
  topicDescription: string = 'Description';
  introText: string = 'Intro / Main topic Text';

  private topic: TopicObjModule = new TopicObjModule();
  constructor(
    private topicControl: TopicControlService,
    private downloadTool: DownloadToolService
  ) {}
  ngOnInit(): void {
    // this.topic.title = 'TT';
    // console.log(this.topic);
  }

  //Add new Simple text to the topic
  addSimpleText() {
    this.addContent(TopicDataType.SimpleText);
  }
  //Add new Code tp the topic
  addCode() {
    this.addContent(TopicDataType.Code);
  }
  //Add new Img to the topic
  addImg() {
    this.addContent(TopicDataType.Img);
  }
  //Add content of the given type to the topic
  addContent(dataType: TopicDataType, textToShow?: string) {
    this.topic.content.push({ data: dataType, text: textToShow });
  }
  //Returns the type of the given content and return it as string
  getType(content: TopicData): string {
    return TopicDataType[content.data];
  }
  //Returns the text of the given topic
  getContentText(content: TopicData): string {
    if (content == null) {
      return '';
    }
    return content.text;
  }
  //Returns the content of the given topic
  getContentCode(content: TopicData) {
    if (content == null) {
      console.log('Null Content');
      return '';
    }
    return content.text;
  }

  removeContent(content: TopicData) {
    this.topic.content = this.topic.content.filter((t) => t !== content);
  }
  //Returns all the topic data in the current topic
  getContent(): TopicData[] {
    return this.topic.content;
  }

  checkText() {
    this.errorText = '';
    if (this.title.myText == null || this.title.myText == '') {
      this.errorText = 'Please add a title';
      return;
    }
    this.topic.title = this.title.myText;
    this.topic.description = this.descriptionField.myText;
    this.topic.text = this.mainTopic.content;
    this.downloadTool.DownloadTextToFileAsJson(this.topic, this.topic.title);
  }

  async onCodeChange(content: TopicData) {
    this.topicControl.rePaintCode();
  }
}
