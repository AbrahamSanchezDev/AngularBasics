import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const lessThan = '&lt';
const graterThan = '&gt';

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
    //Img
    let imgText = this.replaceText(text, '<img ', `<img class="imgObj"`);
    //Code
    // let codeStart = `<div><pre class="prettyprint linenums codeContainer">`;
    // let codeEnd = `</pre></div>`;
    // let codeStartText = this.replaceText(removeDivs, '[code]', codeStart);
    // let final = this.replaceText(codeStartText, '[/code]', codeEnd);
    let final = this.checkForCodes(imgText);
    //Video
    let videoStart = `    
     <iframe width="560" height="315" 
     frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
     picture-in-picture" allowfullscreen
     src=" 
     `;
    let videoEnd = `"></iframe>`;
    let video = this.replaceText(final, '[video]', videoStart);
    let videoFinal = this.replaceText(video, '[/video]', videoEnd);

    return videoFinal;
  }

  //Get the text between the given start and the end
  parseBetween(beginString, endString, originalString): string {
    var beginIndex = originalString.indexOf(beginString);
    if (beginIndex === -1) {
      return null;
    }
    var beginStringLength = beginString.length;
    var substringBeginIndex = beginIndex + beginStringLength;
    var substringEndIndex = originalString.indexOf(
      endString,
      substringBeginIndex
    );
    if (substringEndIndex === -1) {
      return null;
    }
    return originalString.substring(substringBeginIndex, substringEndIndex);
  }
  //Check if it has code tag if so then change them all
  checkForCodes(text: string): string {
    var theText = text;
    var indexCode = theText.indexOf('[code]');
    while (indexCode != -1) {
      theText = this.changeCode(theText);
      indexCode = theText.indexOf('[code]');
    }
    return theText;
  }
  //Change the given text if it has code tag
  changeCode(theText: string): string {
    //Check if it has code tag
    var index = theText.indexOf('[code]');
    if (index == -1) {
      return theText;
    }
    //Look for the text inside of the code tags
    var foundText = this.parseBetween('[code]', '[/code]', theText);
    var newHtml = foundText;
    //Look if it has html tag
    var divIndex = newHtml.indexOf('</div>');
    if (divIndex != -1) {
      newHtml = this.removeGiven(newHtml, '<div', 'div');
      newHtml = this.checkForHtmls(newHtml);
    }
    //Set what the text will be replaced for
    var codeText = `<div><pre class="prettyprint linenums codeContainer"> ${newHtml}</pre></div>`;
    //Replace the text
    var theNewText = this.replaceText(
      theText,
      `[code]${foundText}[/code]`,
      codeText
    );
    return theNewText;
  }
  //Remove the given tag biggining and end < , >
  removeGiven(original: string, lookingFor: string, tag: string): string {
    let remove = '';
    remove = this.replaceText(original, lookingFor, `${lessThan}${tag}`);
    remove = this.replaceText(remove, `">`, `"${graterThan}`);
    return remove;
  }
  //Replace the html tags
  checkForHtmls(text: string) {
    var tags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'ul'];
    tags.forEach((tag) => {
      text = this.removeTo(text, tag);
    });
    return text;
  }
  //Remove < and > to the given text
  removeTo(original: string, container: string): string {
    let removePs = this.replaceText(
      original,
      `<${container}>`,
      `${lessThan}p${graterThan}`
    );
    let removePsEnds = this.replaceText(
      removePs,
      `</${container}>`,
      `${lessThan}/${container}${graterThan}`
    );
    return removePsEnds;
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
