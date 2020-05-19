import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  public onSelected: EventEmitter<T> = new EventEmitter<T>();
  abstract jsonPath: string = 'assets/';
  protected allData: T[] = [];
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
}
