import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css'],
})
export class HowToComponent implements OnInit {
  @Input() topic: TopicObjModule;
  @Input() show: boolean = false;

  constructor(private topicControl: TopicControlService) {
    topicControl.onSelected.subscribe((topic) => this.onSelectedHowTo(topic));
  }

  ngOnInit(): void {}
  onSelect() {
    this.topicControl.onSelected.emit(this.topic);
    this.show = !this.show;
  }
  onSelectedHowTo(topic: TopicObjModule) {
    if (topic == this.topic) {
      return;
    }
    this.deselect();
  }
  public deselect(): void {
    this.show = false;
  }
  public getTopic(): TopicObjModule {
    return this.topic;
  }
  hasImgs(): boolean {
    if (this.topic.imgs.length > 0) {
      return true;
    }
    return false;
  }
  theImgs(): string[] {
    return this.topic.imgs;
  }
}
