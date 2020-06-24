import { ReplaceStrings } from './replace-strings';

export interface RemoveReplaceOptions {
  //Call until all is replaced
  removeFromTo?: ReplaceStrings[];
  replaceText?: ReplaceStrings[];
}
