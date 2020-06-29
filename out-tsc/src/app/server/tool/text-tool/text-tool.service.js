import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let TextToolService = class TextToolService {
    constructor() { }
    //set the given text to have the code tags
    setToCode(text, textToPrelace, element) {
        let newCodeText = this.getTextAsCode(textToPrelace);
        return this.replaceTextAt(text, element, newCodeText, textToPrelace);
    }
    //Turns the given text to the correct format for code
    getTextAsCode(textToPrelace) {
        return `
[code]

${textToPrelace}

[/code]
`;
    }
    //#region  Replace selected
    //Replace the selected text to be an img
    replaceSelectedToImg(text, textToReplace, element) {
        let noSpaces = textToReplace.replace(/\s/g, '');
        let theNewText = `<img src="${noSpaces}" alt = "Image not found"/>`;
        return this.replaceTextAt(text, element, theNewText, textToReplace);
    }
    //Replace select text to be a link
    replaceSelectedToLink(originalText, link, element) {
        var newText = `<a href = "${link}" target= "_blank">Link</a>`;
        if (originalText == null) {
            return newText;
        }
        return this.replaceTextAt(originalText, element, newText, link);
    }
    //Replace the text at the given index for the other text
    replaceTextAt(originalText, element, textToReplace, originalReplace = '') {
        //Get the starting position
        let index = element.nativeElement.selectionStart;
        //Extra inf in case you changed something
        if (originalReplace == '') {
            originalReplace = textToReplace;
        }
        //The Text to return
        var finalText = `${originalText.substr(0, index)}${textToReplace}${originalText.substr(index + originalReplace.length)}`;
        return finalText;
    }
    //#endregion
    //#region Insert
    //Insert link to the given element at the last selected position
    insertLink(originalText, link, display, element) {
        var theNewText = `<a href = "${link}" target= "_blank">${display}</a>`;
        return this.insertText(originalText, theNewText, element);
    }
    //Insert img to the given element at the last selected position
    InsertImg(originalText, link, altText, element) {
        let replaceFor = `<img src="${link}" alt = "${altText}"/>`;
        return this.insertText(originalText, replaceFor, element);
    }
    //Insert text at the given element in it last selected position
    insertText(originalText, textToAdd, element) {
        if (originalText == null) {
            return textToAdd;
        }
        //Get the last selected position
        let startPos = element.nativeElement.selectionStart;
        return `${originalText.substring(0, startPos)}${textToAdd}${originalText.substring(startPos, originalText.length)}`;
    }
    //#endregion
    //Combine the 3 texts as html tags
    setToTag(text, tag, textToPrelace, element) {
        var replaceFor = `<${tag}>${textToPrelace}</${tag}>`;
        return this.replaceTextAt(text, element, replaceFor, textToPrelace);
    }
};
TextToolService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], TextToolService);
export { TextToolService };
//# sourceMappingURL=text-tool.service.js.map