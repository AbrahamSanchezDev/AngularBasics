import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicData } from '../../model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { DownloadToolService } from 'src/app/service/tool/download-tool/download-tool.service';
import { ArraysToolService } from 'src/app/service/tool/arrays-tool/arrays-tool.service';

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
    protected downloadTool: DownloadToolService,
    private arraysTool: ArraysToolService
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
    this.arraysTool.moveElementLeft(this.topic.content, content);
  }
  //Move content down
  moveDown(content: TopicData): void {
    this.arraysTool.moveElementRight(this.topic.content, content);
  }
  //Returns all the topic data in the current topic
  getContent(): TopicData[] {
    return this.topic.content;
  }
}
