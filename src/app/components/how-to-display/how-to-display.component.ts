import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/service/topic/topic-control.service';
import { TopicData } from 'src/app/model/topic/topic-data';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-how-to-display',
  templateUrl: './how-to-display.component.html',
  styleUrls: ['./how-to-display.component.css'],
})
export class HowToDisplayComponent implements AfterViewChecked {
  @Input() extraClass: string = 'mostTop';
  topic: TopicObjModule;

  saveHtml: SafeHtml;
  showUi: boolean = false;
  constructor(
    public topicControl: TopicControlService,
    private sanitizer: DomSanitizer
  ) {
    this.register();
  }

  //Repaint the display code
  public ngAfterViewChecked() {
    this.repaint();
  }

  //Call on repaint
  repaint(): void {
    this.topicControl.rePaintCode();
  }
  register(): void {
    this.topicControl.onSelected.subscribe((topic) =>
      this.onSelectedHowTo(topic)
    );
    this.topicControl.onSearch.subscribe((text) => {
      this.onClose();
    });
  }
  //Check if the topic is valid
  isValid(): boolean {
    return this.showUi;
  }
  //Returns all the topic data in the current topic
  getContent(): TopicData[] {
    return this.topic.content;
  }
  //Get topic text as trusted html
  getTopicText(): SafeHtml {
    return this.saveHtml;
  }
  //Returns the text of the given topic
  getContentText(content: TopicData): string {
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
    this.showUi = topic != null;
    if (topic == null) {
      return;
    }
    this.topic = topic;
    this.saveHtml = this.sanitizer.bypassSecurityTrustHtml(this.topic.text);
  }
  //Called when the X button is pressed and set the current topic to null and send the event
  onClose(): void {
    this.showUi = false;
    this.topicControl.onSelected.emit(null);
  }
}
