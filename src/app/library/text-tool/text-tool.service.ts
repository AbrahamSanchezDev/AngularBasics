import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToolService {
  constructor() {}
  //set the given text to have the code tags
  setToCode(text: string, textToPrelace: string, element: ElementRef): string {
    let newCodeText = `
  [code] 
      ${textToPrelace}
  [/code]`;
    return this.replaceTextAt(text, element, newCodeText, textToPrelace);
  }
  //#region  Replace selected
  //Replace the selected text to be an img
  replaceSelectedToImg(
    text: string,
    textToReplace: string,
    element: ElementRef
  ): string {
    let noSpaces = textToReplace.replace(/\s/g, '');
    let theNewText = `<img src="${noSpaces}" alt = "Image not found"/>`;
    return this.replaceTextAt(text, element, theNewText, textToReplace);
  }
  //Replace select text to be a link
  replaceSelectedToLink(
    originalText: string,
    link: string,
    element: ElementRef
  ): string {
    var newText = `<a href = "${link}" target= "_blank">Link</a>`;
    if (originalText == null) {
      return newText;
    }
    return this.replaceTextAt(originalText, element, newText, link);
  }
  //Replace the text at the given index for the other text
  replaceTextAt(
    originalText: string,
    element: ElementRef,
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
  //Insert link to the given element at the last selected position
  insertLink(
    originalText: string,
    link: string,
    display: string,
    element: ElementRef
  ): string {
    var theNewText = `<a href = "${link}" target= "_blank">${display}</a>`;
    return this.insertText(originalText, theNewText, element);
  }
  //Insert img to the given element at the last selected position
  InsertImg(
    originalText: string,
    link: string,
    altText: string,
    element: ElementRef
  ) {
    let replaceFor = `<img src="${link}" alt = "${altText}"/>`;
    return this.insertText(originalText, replaceFor, element);
  }
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
  //Conbine the 3 texts as html tags
  setToTag(
    text: string,
    tag: string,
    textToPrelace,
    element: ElementRef
  ): string {
    var replaceFor = `<${tag}>${textToPrelace}</${tag}>`;
    return this.replaceTextAt(text, element, replaceFor, textToPrelace);
  }
}
