import { __decorate } from "tslib";
import { Component, Input, ViewChild, } from '@angular/core';
let InputMultilineComponent = class InputMultilineComponent {
    constructor() {
        this.title = '';
        this.cssClass = 'expInputArea';
        this.height = '150px';
    }
    ngAfterViewInit() {
        if (this.theText == null) {
            console.log('No Text view child');
        }
    }
    ngOnInit() { }
};
__decorate([
    Input()
], InputMultilineComponent.prototype, "title", void 0);
__decorate([
    Input()
], InputMultilineComponent.prototype, "cssClass", void 0);
__decorate([
    Input()
], InputMultilineComponent.prototype, "content", void 0);
__decorate([
    Input()
], InputMultilineComponent.prototype, "height", void 0);
__decorate([
    ViewChild('theText')
], InputMultilineComponent.prototype, "theText", void 0);
InputMultilineComponent = __decorate([
    Component({
        selector: 'app-input-multiline',
        templateUrl: './input-multiline.component.html',
        styleUrls: ['./input-multiline.component.css'],
    })
], InputMultilineComponent);
export { InputMultilineComponent };
//# sourceMappingURL=input-multiline.component.js.map