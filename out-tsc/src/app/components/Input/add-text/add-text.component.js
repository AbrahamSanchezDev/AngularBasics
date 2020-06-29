import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let AddTextComponent = class AddTextComponent {
    constructor() {
        this.addTextData = new EventEmitter();
        this.tempPlaceHolder = 'Add...';
        this.addText = 'Submit';
        this.clearIt = true;
        this.reportEmpty = false;
    }
    ngOnInit() { }
    onSubmit() {
        //this would send the content of the input field only if there is a text
        if (this.myText) {
            this.addTextData.emit(this.myText);
            if (this.clearIt) {
                this.myText = null;
            }
            return;
        }
        if (this.reportEmpty) {
            this.addTextData.emit(this.myText);
        }
    }
};
__decorate([
    Output()
], AddTextComponent.prototype, "addTextData", void 0);
__decorate([
    Input('tempText')
], AddTextComponent.prototype, "tempPlaceHolder", void 0);
__decorate([
    Input('addText')
], AddTextComponent.prototype, "addText", void 0);
__decorate([
    Input()
], AddTextComponent.prototype, "clearIt", void 0);
__decorate([
    Input()
], AddTextComponent.prototype, "reportEmpty", void 0);
AddTextComponent = __decorate([
    Component({
        selector: 'app-add-text',
        templateUrl: './add-text.component.html',
        styleUrls: ['./add-text.component.css'],
    })
], AddTextComponent);
export { AddTextComponent };
//# sourceMappingURL=add-text.component.js.map