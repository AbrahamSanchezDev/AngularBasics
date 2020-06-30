import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  public onSelected: EventEmitter<T> = new EventEmitter<T>();
  public onLoadedAll: EventEmitter<void> = new EventEmitter();
  public onSearch: EventEmitter<string> = new EventEmitter<string>();

  protected allData: T[] = [];
  customData: T[] = [];

  abstract mainObjectsFile;

  constructor(protected http: HttpClient) {}

  loadTopicsFromFile(): void {
    this.getObjectsFile(this.mainObjectsFile).subscribe((datas) => {
      for (let i = 0; i < datas.length; i++) {
        this.onLoadData(datas[i]);
      }
      this.onLoadedAll.emit();
    });
  }
  //Returns the http as an observable
  getObjectsFile(filePath: string): Observable<T[]> {
    return this.http.get<T[]>(filePath);
  }
  //Returns the http as an observable
  getFile(filePath: string): Observable<T> {
    return this.http.get<T>(filePath);
  }
  //Get the list of objects
  getAllData(): T[] {
    return this.allData;
  }
  //Add an object tot he list
  addData(obj: T) {
    this.allData.push(obj);
  }
  onLoadData(data: T): void {
    data = this.initData(data);
    //Check if it should add to the start of the array wih unshift
    if (this.firstPlaceObj(data)) {
      this.allData.unshift(data);
    } else {
      this.allData.push(data);
    }
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
