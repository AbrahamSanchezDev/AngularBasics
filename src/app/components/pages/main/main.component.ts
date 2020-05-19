import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title: string = 'Angular Basics';
  topics: TopicObjModule[];
  description: string;

  constructor(private topicsServer: TopicControlService) {}

  ngOnInit(): void {
    this.topics = this.topicsServer.getJsonTopics();
  }
}
