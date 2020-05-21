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
      this.http
        .get<T>(this.jsonPath + this.fileNames[i] + '.json')
        .subscribe((data) => {
          data = this.initData(data);
          this.allData.push(data);
        });
    }
    return this.allData;
  }
  protected abstract initData(data: T): T;
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
  protected abstract matchTopic(topic: T, keyword: string): boolean;

  //Call the search event
  search(text: string): void {
    this.onSearch.emit(text);
  }
  //Replace the tags for the correct code and classes
  replaceTags(text: string): string {
    let imgText = this.replaceText(text, '<img ', '<img class="imgObj"');
    let codeStart = this.replaceText(
      imgText,
      '[code]',
      '<div><pre class="prettyprint linenums codeContainer">'
    );
    let final = this.replaceText(codeStart, '[/code]', '</pre></div>');
    return final;
  }
  //Replace the text for a new one
  replaceText(text: string, original: string, newText: string): string {
    // The general pattern is = text.split(search).join(replacement)
    var newText = text.split(original).join(newText);
    return newText;
  }
  //se the given text to have the code tags
  setToCode(text: string, textToPrelace: string): string {
    return text.replace(
      textToPrelace,
      `[code] 
    ${textToPrelace}
[/code]`
    );
  }
  //Set the selected text to be an img
  setToImg(text: string, textToPrelace: string): string {
    let noSpaces = textToPrelace.replace(/\s/g, '');
    return text.replace(textToPrelace, `<img src="${noSpaces}"/>`);
  }
  //Conbine the 3 texts as html tags
  setToTag(text: string, tag: string, textToPrelace): string {
    return text.replace(textToPrelace, `<${tag}>${textToPrelace}</${tag}>`);
  }
}
