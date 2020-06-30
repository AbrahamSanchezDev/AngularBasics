import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  public onSelected: EventEmitter<T> = new EventEmitter<T>();
  public onSearch: EventEmitter<string> = new EventEmitter<string>();
  abstract jsonPath: string = 'assets/';
  allData: T[] = [];
  customData: T[] = [];
  abstract fileNames: string[] = [];
  constructor(protected http: HttpClient) {}

  //Get the  Data from Json files
  getJsonData(): T[] {
    //Check it the files were already loaded if so return them
    if (this.allData.length > 0) {
      return this.allData;
    }
    // Get all the files that are in the file names
    for (let i = 0; i < this.fileNames.length; i++) {
      this.http
        .get<T>(`${this.jsonPath}${this.fileNames[i]}.json`)
        .subscribe((data) => {
          data = this.initData(data);
          //Check if it should add to the start of the array wih unshift
          if (this.firstPlaceObj(data)) {
            this.allData.unshift(data);
          } else {
            this.allData.push(data);
          }
        });
    }
    return this.allData;
  }

  abstract firstPlaceObj(data: T): boolean;
  abstract initData(data: T): T;
  //Search for topics that match the given topic name
  getData(topicName: string): T[] {
    this.customData.length = 0;
    for (let i = 0; i < this.allData.length; i++) {
      if (this.matchTopic(this.allData[i], topicName)) {
        this.customData.push(this.allData[i]);
      }
    }
    return this.customData;
  }
  abstract matchTopic(topic: T, keyword: string): boolean;
  //Call the search event
  search(text: string): void {
    this.onSearch.emit(text);
  }
}
