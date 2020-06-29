import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let MultiLineToJsonComponent = class MultiLineToJsonComponent {
    constructor() {
        this.createText = new EventEmitter();
        this.title = '';
        this.cssClass = 'expInputArea';
    }
    ngOnInit() { }
    //Generate the text array using the current content
    generateText() {
        if (this.content == null || this.content.length == 0) {
            return;
        }
        let textInArray = this.content.split('\n');
        return textInArray;
    }
};
__decorate([
    Output()
], MultiLineToJsonComponent.prototype, "createText", void 0);
__decorate([
    Input()
], MultiLineToJsonComponent.prototype, "title", void 0);
__decorate([
    Input()
], MultiLineToJsonComponent.prototype, "cssClass", void 0);
__decorate([
    Input()
], MultiLineToJsonComponent.prototype, "content", void 0);
MultiLineToJsonComponent = __decorate([
    Component({
        selector: 'app-multi-line-to-json',
        templateUrl: './multi-line-to-json.component.html',
        styleUrls: ['./multi-line-to-json.component.css'],
    })
], MultiLineToJsonComponent);
export { MultiLineToJsonComponent };
//# sourceMappingURL=multi-line-to-json.component.js.map