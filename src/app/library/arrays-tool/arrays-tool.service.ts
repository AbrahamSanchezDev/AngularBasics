import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArraysToolService {
  constructor() {}
  //Move element
  moveElementInArray(array: any[], element: any, newPos: number) {
    var index = array.indexOf(element);
    // Item non-existent?
    if (index == -1) {
      return false;
    }
    // If there is a previous element in sections
    if (array[newPos]) {
      // Swap elements
      if (newPos < index) {
        array.splice(newPos, 2, array[index], array[newPos]);
      } else {
        array.splice(index, 2, array[newPos], array[index]);
      }
    } else {
      console.log('Do Nothing');
    }
  }
}
