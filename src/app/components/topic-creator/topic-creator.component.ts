import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../Input/input-multiline/input-multiline.component';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicData } from '../../model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css'],
})
export class TopicCreatorComponent implements OnInit {
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
  ngOnInit(): void {}

  //Add new Simple text to the topic
  addSimpleText(): void {
    this.addContent(TopicDataType.SimpleText);
  }
  //Add new Code tp the topic
  addCode(): void {
    this.addContent(TopicDataType.Code);
  }
  //Add new Img to the topic
  addImg(): void {
    this.addContent(TopicDataType.Img);
  }
  //Add content of the given type to the topic
  addContent(dataType: TopicDataType, textToShow?: string): void {
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
  getContentCode(content: TopicData): string {
    if (content == null) {
      console.log('Null Content');
      return '';
    }
    return content.text;
  }
  //Remove the given topic
  removeContent(content: TopicData): void {
    this.topic.content = this.topic.content.filter((t) => t !== content);
  }
  //Check if the up button should be displayed
  showUp(content: TopicData): boolean {
    return this.topic.content.indexOf(content) > 0;
  }
  //Check if the down button should be displayed
  showDown(content: TopicData): boolean {
    return this.topic.content.indexOf(content) < this.topic.content.length - 1;
  }
  //Move content up
  moveUp(content: TopicData): void {
    this.moveContent(content, -1);
  }
  //Move content down
  moveDown(content: TopicData): void {
    this.moveContent(content, 1);
  }
  //Move the content by the given amount
  moveContent(content: TopicData, amount: number) {
    let curIndex = this.topic.content.indexOf(content);
    let newPos = curIndex + amount;
    this.moveElementInArray(this.topic.content, content, newPos);
  }
  //Move element
  moveElementInArray(array: any[], element: any, newPos: number) {
    var index = array.indexOf(element);
    // Item non-existent?
    if (index == -1) {
      return false;
    }
    // If there is a previous element in sections
    if (array[newPos]) {
      // Swap elements
      if (newPos < index) {
        array.splice(newPos, 2, array[index], array[newPos]);
      } else {
        array.splice(index, 2, array[newPos], array[index]);
      }
    } else {
      console.log('Do Nothing');
    }
  }
  //Returns all the topic data in the current topic
  getContent(): TopicData[] {
    return this.topic.content;
  }
  //Check for valid values and create the json file
  checkText(): void {
    this.errorText = '';
    if (this.title.myText == null || this.title.myText == '') {
      this.errorText = 'Please add a title';
      return;
    }
    this.updateTopicData();
    this.downloadTool.DownloadTextToFileAsJson(this.topic, this.topic.title);
  }
  //Updates the values for the current topic
  updateTopicData(): void {
    this.topic.title = this.title.myText;
    this.topic.description = this.descriptionField.myText;
    this.topic.text = this.mainTopic.content;
  }
}
