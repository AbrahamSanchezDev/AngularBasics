import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let TextFieldComponent = class TextFieldComponent {
    constructor() {
        this.title = 'Title';
        this.mainClass = 'text-parent';
        this.lableClass = 'lable-name';
        this.contentClass = 'content-name';
        this.myText = '';
    }
    ngOnInit() { }
};
__decorate([
    Input()
], TextFieldComponent.prototype, "title", void 0);
__decorate([
    Input()
], TextFieldComponent.prototype, "mainClass", void 0);
__decorate([
    Input()
], TextFieldComponent.prototype, "lableClass", void 0);
__decorate([
    Input()
], TextFieldComponent.prototype, "contentClass", void 0);
TextFieldComponent = __decorate([
    Component({
        selector: 'app-text-field',
        templateUrl: './text-field.component.html',
        styleUrls: ['./text-field.component.css'],
    })
], TextFieldComponent);
export { TextFieldComponent };
//# sourceMappingURL=text-field.component.js.map