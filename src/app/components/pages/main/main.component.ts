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

  constructor(private topicsServer: TopicControlService) {
    topicsServer.onSearch.subscribe((text) => {
      this.getTopics(text);
    });
  }
  //On Init get the topic
  ngOnInit(): void {
    this.getTopics();
  }
  //Get the topics if no text given if not then do a custom search
  getTopics(text?: string): void {
    if (text == null || text == '') {
      this.topics = this.topicsServer.getJsonData();
      return;
    }
    this.topics = this.topicsServer.getData(text);
  }
}
