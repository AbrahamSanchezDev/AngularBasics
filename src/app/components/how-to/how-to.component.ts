import { Component, OnInit, Input } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/service/topic/topic-control.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css'],
})
export class HowToComponent implements OnInit {
  @Input() topic: TopicObjModule;

  constructor(private topicControl: TopicControlService) {}

  ngOnInit(): void {}
  //Called on selected the topic event
  onSelect(): void {
    this.topicControl.onSelected.emit(this.topic);
  }
}
