import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { TopicData } from 'src/app/model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';

@Component({
  selector: 'app-how-to-display',
  templateUrl: './how-to-display.component.html',
  styleUrls: ['./how-to-display.component.css'],
})
export class HowToDisplayComponent implements AfterViewChecked {
  @Input() extraClass: string = 'mostTop';
  topic: TopicObjModule;

  constructor(
    private topicControl: TopicControlService,
    private viewContainerRef: ViewContainerRef
  ) {
    topicControl.onSelected.subscribe((topic) => this.onSelectedHowTo(topic));
    topicControl.onSearch.subscribe((text) => {
      this.onClose();
    });
  }

  //Repaint the display code
  public ngAfterViewChecked(): any {
    this.topicControl.rePaintCode();
  }
  //Check if the topic is valid
  isValid(): boolean {
    return this.topic != null;
  }
  //Returns all the topic data in the current topic
  getContent(): TopicData[] {
    return this.topic.content;
  }
  getTopicText(): string {
    return this.topic.text;
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
      return '';
    }
    return content.text;
  }
  //Returns the type of the given content and return it as string
  getType(content: TopicData): string {
    return TopicDataType[content.data];
  }
  //Called by the event onSelectedTopic and set this topic to the selected topic
  onSelectedHowTo(topic: TopicObjModule): void {
    this.topic = topic;
  }
  //Called when the X button is pressed and set the current topic to null and send the event
  onClose(): void {
    this.topic = null;
    this.topicControl.onSelected.emit(this.topic);
  }
}
