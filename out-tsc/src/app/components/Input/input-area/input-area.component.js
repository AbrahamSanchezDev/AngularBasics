import { __decorate } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let InputAreaComponent = class InputAreaComponent {
    constructor() {
        this.onDeleteText = new EventEmitter();
        this.text = 'add text...';
    }
    ngOnInit() { }
    onDelete() {
        //this would send the content of the input field only if there is a text
        if (this.text) {
            this.onDeleteText.emit(this.text);
        }
    }
};
__decorate([
    Output()
], InputAreaComponent.prototype, "onDeleteText", void 0);
__decorate([
    Input()
], InputAreaComponent.prototype, "text", void 0);
InputAreaComponent = __decorate([
    Component({
        selector: 'app-input-area',
        templateUrl: './input-area.component.html',
        styleUrls: ['./input-area.component.css'],
    })
], InputAreaComponent);
export { InputAreaComponent };
//# sourceMappingURL=input-area.component.js.map