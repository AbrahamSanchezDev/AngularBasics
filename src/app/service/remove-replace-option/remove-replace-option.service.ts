import { Injectable } from '@angular/core';
import { TextToolService } from '../tool/text-tool/text-tool.service';
import { ReplaceStrings } from 'src/app/interface/replace-strings';
import { RemoveReplaceOptions } from 'src/app/interface/remove-replace-options';

@Injectable({
  providedIn: 'root',
})
export class RemoveReplaceOptionService extends TextToolService {
  constructor() {
    super();
  }
  //Remove all the text given by the options
  removeAllOptions(
    originalString: string,
    options: RemoveReplaceOptions
  ): string {
    const { removeFromTo, replaceText } = options;
    if (removeFromTo) {
      originalString = this.removeFromToOptions(originalString, removeFromTo);
    }
    if (replaceText) {
      originalString = this.replaceTextOptions(originalString, replaceText);
    }
    return originalString;
  }
  //Replace a list of text that match the original for something else
  replaceTextOptions(
    originalString: string,
    replaceText: ReplaceStrings[]
  ): string {
    for (let i = 0; i < replaceText.length; i++) {
      originalString = this.replaceText(
        originalString,
        replaceText[i].original,
        replaceText[i].replaceFor
      );
    }
    return originalString;
  }
  //Replace the text that is from start to end for some other text
  removeFromToOptions(
    originalString: string,
    removeFromTo: ReplaceStrings[]
  ): string {
    for (let i = 0; i < removeFromTo.length; i++) {
      while (originalString.includes(removeFromTo[i].original)) {
        originalString = this.removeTextFromTo(
          originalString,
          removeFromTo[i].replaceFor,
          removeFromTo[i].original,
          removeFromTo[i].originalEnd
        );
      }
    }
    return originalString;
  }
}
