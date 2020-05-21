import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../Input/text-field/text-field.component';
import { InputMultilineComponent } from '../Input/input-multiline/input-multiline.component';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicData } from '../../model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: [
    './topic-creator.component.css',
    '../Topic/topic-creator-base/topic-creator-base.component.css',
  ],
})
export class TopicCreatorComponent extends TopicCreatorBaseComponent
  implements OnInit {
  constructor(
    private topicControl: TopicControlService,
    protected downloadTool: DownloadToolService
  ) {
    super(downloadTool);
  }
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
}
