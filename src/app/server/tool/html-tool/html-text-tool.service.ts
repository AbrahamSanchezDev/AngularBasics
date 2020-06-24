import { Injectable, ElementRef } from '@angular/core';
import { TextToolService } from '../text-tool/text-tool.service';

@Injectable({
  providedIn: 'root',
})
export class HtmlTextToolService extends TextToolService {
  constructor() {
    super();
  }
  //#region Code tag
  //set the given text to have the code tags
  setToCode(
    text: string,
    textToReplace: string,
    element: ElementRef<any>
  ): string {
    let newCodeText = this.getTextAsCode(textToReplace);
    return this.replaceTextAt(text, element, newCodeText, textToReplace);
  }

  //Turns the given text to the correct format for code
  getTextAsCode(textToReplace: string): string {
    return `
[code]

${textToReplace}

[/code]
`;
  }
  //#endregion

  //#region  Replace selected
  //Replace the selected text to be an img
  replaceSelectedToImg(
    text: string,
    linkText: string,
    element: ElementRef<any>
  ): string {
    let noSpaces = linkText.replace(/\s/g, '');
    let theNewText = `<img src="${noSpaces}" alt = "Image not found"/>`;
    return this.replaceTextAt(text, element, theNewText, linkText);
  }
  //Replace select text to be a link
  replaceSelectedToLink(
    originalText: string,
    linkText: string,
    element: ElementRef<any>
  ): string {
    var newText = `<a href="${linkText}" target= "_blank">Link</a>`;
    if (originalText == null) {
      return newText;
    }
    return this.replaceTextAt(originalText, element, newText, linkText);
  }
  //#endregion

  //#region Insert
  //Insert link to the given element at the last selected position
  insertLink(
    originalText: string,
    link: string,
    display: string,
    element: ElementRef<any>
  ): string {
    var theNewText = `<a href = "${link}" target= "_blank">${display}</a>`;
    return this.insertText(originalText, theNewText, element);
  }
  //Insert img to the given element at the last selected position
  InsertImg(
    originalText: string,
    link: string,
    altText: string,
    element: ElementRef<any>
  ) {
    let replaceFor = `<img src="${link}" alt = "${altText}"/>`;
    return this.insertText(originalText, replaceFor, element);
  }
  //#endregion

  //Set the given text to be in between the start and ending tag
  setToTag(
    text: string,
    tag: string,
    textToReplace: string,
    element: ElementRef
  ): string {
    var replaceFor = `<${tag}>${textToReplace}</${tag}>`;
    return this.replaceTextAt(text, element, replaceFor, textToReplace);
  }
}
