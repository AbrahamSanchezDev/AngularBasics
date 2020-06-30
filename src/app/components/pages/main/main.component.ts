import { Component, OnInit } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicControlService } from 'src/app/service/topic/topic-control.service';
import { DownloadToolService } from 'src/app/service/tool/download-tool/download-tool.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title: string = 'Angular Basics';
  topics: TopicObjModule[];
  currentTopics: TopicObjModule[];
  description: string;

  constructor(
    private topicsServer: TopicControlService,
    private download: DownloadToolService
  ) {
    topicsServer.onSearch.subscribe((text) => {
      this.getTopics(text);
    });
    topicsServer.onSelected.subscribe((topic) => {
      this.onDisplayTopic(topic);
    });
    topicsServer.onLoadedAll.subscribe(() => {
      this.getTopics();
    });
  }
  //On Init get the topic
  ngOnInit(): void {
    this.getTopics();
  }
  //Get the topics if no text given if not then do a custom search
  getTopics(text?: string): void {
    if (text == null || text == '') {
      this.topics = this.topicsServer.getAllData();
      this.currentTopics = this.topics;
      return;
    }
    this.topics = this.topicsServer.getData(text);
    this.currentTopics = this.topics;
  }
  //Don't display any topic when displaying one
  onDisplayTopic(topic: TopicObjModule) {
    if (topic == null) {
      this.topics = this.currentTopics;
      return;
    }
    this.topics = null;
  }
  // onDownloadAll(): void {
  //   this.download.DownloadTextToFileAsJson(this.topicsServer.allData, 'topics');
  // }
}
