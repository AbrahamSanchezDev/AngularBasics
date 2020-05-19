import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  public onSelected: EventEmitter<T> = new EventEmitter<T>();
  public onSearch: EventEmitter<string> = new EventEmitter<string>();
  abstract jsonPath: string = 'assets/';
  protected allData: T[] = [];
  protected customData: T[] = [];
  abstract fileNames: string[] = [];
  constructor(private http: HttpClient) {}

  //Get the  Data from Json files
  getJsonData(): T[] {
    //Check it the files were already loaded if so return them
    if (this.allData != null && this.allData.length > 0) {
      return this.allData;
    }
    // Get all the files that are in the file names
    for (let i = 0; i < this.fileNames.length; i++) {
      this.http.get<T>(this.jsonPath + this.fileNames[i]).subscribe((data) => {
        this.allData.push(data);
      });
    }
    return this.allData;
  }
  //Search for topics that match the given topic name
  getData(topicName: string): T[] {
    this.customData.length = 0;
    var searchText = topicName.split(',');
    for (let i = 0; i < this.allData.length; i++) {
      for (let x = 0; x < searchText.length; x++) {
        if (this.matchTopic(this.allData[i], searchText[x])) {
          this.customData.push(this.allData[i]);
          continue;
        }
      }
    }
    return this.customData;
  }
  //Check if the topic match the keyword
  protected abstract matchTopic(topic: T, keyword: string);

  //Call the search event
  search(text: string) {
    this.onSearch.emit(text);
  }
}
