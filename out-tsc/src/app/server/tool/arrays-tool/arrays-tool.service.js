import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ArraysToolService = class ArraysToolService {
    constructor() { }
    //Move element
    moveElementInArray(array, element, newPos) {
        var index = array.indexOf(element);
        // Item non-existent?
        if (index == -1) {
            return;
        }
        if (index >= array.length) {
            return;
        }
        // If there is a previous element in sections
        if (array[newPos]) {
            // Swap elements
            if (newPos < index) {
                array.splice(newPos, 2, array[index], array[newPos]);
            }
            else {
                array.splice(index, 2, array[newPos], array[index]);
            }
        }
        else {
            console.log('Do Nothing');
        }
    }
    //Move element at the given index to the left
    moveElementAtIndexLeft(array, index) {
        this.moveElementInArray(array, array[index], index - 1);
    }
    //Move element at the given index to the right
    moveElementAtIndexRight(array, index) {
        this.moveElementInArray(array, array[index], index + 1);
    }
    //Move to the left (example: if it was at 1 the it will move to the 0)
    moveElementLeft(array, element) {
        let curIndex = array.indexOf(element);
        let newPos = curIndex - 1;
        this.moveElementInArray(array, element, newPos);
    }
    //Move to the right (example: if it was at 1 the it will move to the 2)
    moveElementRight(array, element) {
        let curIndex = array.indexOf(element);
        let newPos = curIndex + 1;
        this.moveElementInArray(array, element, newPos);
    }
    //Remove the element from the array
    removeFromArray(array, element) {
        return array.filter((currentElement) => currentElement !== element);
    }
};
ArraysToolService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ArraysToolService);
export { ArraysToolService };
//# sourceMappingURL=arrays-tool.service.js.map