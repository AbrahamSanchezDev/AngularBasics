import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToolService {
  constructor() {}

  //#region  Replace selected

  //Replace the text at the given index for the other text
  replaceTextAt(
    originalText: string,
    element: ElementRef<any>,
    textToReplace: string,
    originalReplace: string = ''
  ): string {
    //Get the starting position
    let index = element.nativeElement.selectionStart;
    //Extra inf in case you changed something
    if (originalReplace == '') {
      originalReplace = textToReplace;
    }
    //The Text to return
    var finalText = `${originalText.substr(
      0,
      index
    )}${textToReplace}${originalText.substr(index + originalReplace.length)}`;
    return finalText;
  }

  //#endregion

  //#region Insert

  //Insert text at the given element in it last selected position
  insertText(originalText: String, textToAdd: string, element: ElementRef) {
    if (originalText == null) {
      return textToAdd;
    }
    //Get the last selected position
    let startPos = element.nativeElement.selectionStart;

    return `${originalText.substring(
      0,
      startPos
    )}${textToAdd}${originalText.substring(startPos, originalText.length)}`;
  }
  //#endregion
}
