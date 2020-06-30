import { Component, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicData } from 'src/app/model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { DownloadToolService } from 'src/app/service/tool/download-tool/download-tool.service';

@Component({
  selector: 'app-topic-creator-base',
  templateUrl: './topic-creator-base.component.html',
  styleUrls: ['./topic-creator-base.component.css'],
})
export abstract class TopicCreatorBaseComponent {
  @ViewChild('titleField') title: TextFieldComponent;
  @ViewChild('descriptionField') descriptionField: TextFieldComponent;
  @ViewChild('mainTopic') mainTopic: InputMultilineComponent;

  protected errorText: string = '';
  protected topicName: string = 'Title';
  protected topicDescription: string = 'Description';
  protected introText: string = 'Intro / Main topic Text';

  topic: TopicObjModule = new TopicObjModule();
  constructor(protected downloadTool: DownloadToolService) {}
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
  //Check for valid values and create the json file
  checkText(): void {
    // if (this.title == null) {
    //   return;
    // }
    this.errorText = '';
    if (this.title.myText == null || this.title.myText == '') {
      this.errorText = 'Please add a title';
      return;
    }
    this.updateTopicData();
    this.downloadAsJsonFile(this.topic, this.topic.title);
  }
  //Create the json file with the given data and the given file name
  downloadAsJsonFile(data: any, fileName: string): void {
    this.downloadTool.DownloadTextToFileAsJson(data, fileName);
  }
  //Updates the values for the current topic
  updateTopicData(): void {
    this.topic.title = this.title.myText;
    this.topic.description = this.descriptionField.myText;
    this.topic.text = this.mainTopic.content;
  }
  updateFromTopic(): void {
    this.title.myText = this.topic.title;
    this.descriptionField.myText = this.topic.description;
    this.mainTopic.content = this.topic.text;
  }
  //Returns the error text
  getErrorText(): string {
    return this.errorText;
  }
  //Returns the topicName
  getTopicName(): string {
    return this.topicName;
  }
  //Returns the topicDescription
  getTopicDescription(): string {
    return this.topicDescription;
  }
  //Returns the introText
  getIntroText(): string {
    return this.introText;
  }
}
