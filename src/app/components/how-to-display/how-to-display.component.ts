import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
declare const PR: any;
@Component({
  selector: 'app-how-to-display',
  templateUrl: './how-to-display.component.html',
  styleUrls: ['./how-to-display.component.css'],
})
export class HowToDisplayComponent implements AfterViewChecked {
  topic: TopicObjModule;

  defaultTopic: TopicObjModule;

  constructor(private topicControl: TopicControlService) {
    topicControl.onSelected.subscribe((topic) => this.onSelectedHowTo(topic));
  }

  ngOnInit(): void {}
  //Repaint the display code
  public ngAfterViewChecked(): any {
    PR.prettyPrint();
  }
  //Check if the topic is valid
  isValid(): boolean {
    return this.topic != null;
  }
  //Returns the imgs in this topic
  getImgs(): string[] {
    return this.topic.imgs;
  }
  //Returns the code lines in the topic
  getCode(): string[] {
    return this.topic.code;
  }
  //Called by the event onSelectedTopic and set this topic to the selected topic
  onSelectedHowTo(topic: TopicObjModule) {
    this.topic = topic;
  }
  onClose() {
    this.topic = this.defaultTopic;
    this.topicControl.onSelected.emit(this.topic);
  }
}
