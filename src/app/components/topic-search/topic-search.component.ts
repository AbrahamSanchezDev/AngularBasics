import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicControlService } from 'src/app/service/topic/topic-control.service';
import { AddTextComponent } from '../Input/add-text/add-text.component';

@Component({
  selector: 'app-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.css'],
})
export class TopicSearchComponent implements OnInit {
  @ViewChild('inputAddText') inputAddText: AddTextComponent;
  butttonText: string = 'Search';
  tempText: string = 'Search Topic...';
  doingSearch: boolean = false;

  constructor(private topicsServer: TopicControlService) {}

  ngOnInit(): void {}
  //Search the topic with the given text called by the AddTextComponent
  searchTopic(text: string) {
    if (text == undefined || text == '') {
      this.cancelSearch();
      return;
    }
    this.doingSearch = true;
    this.topicsServer.search(text);
  }
  //Returns if it's doing a search
  searching(): boolean {
    return this.doingSearch;
  }
  //Cancel current search
  cancelSearch(): void {
    this.doingSearch = false;
    this.topicsServer.search('');
    this.inputAddText.myText = '';
  }
}
