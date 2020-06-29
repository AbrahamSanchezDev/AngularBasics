import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CodeDisplayComponent = class CodeDisplayComponent {
    constructor(topicControl) {
        this.topicControl = topicControl;
        this.codeText = `
  //Repaint the code
  onCodeChanged(): void {
    console.log(this.codeText);
    this.topicControl.rePaintCode();
    console.log('Changed Something');
  }
  `;
    }
    ngOnInit() { }
    //Repaint the code
    onCodeChanged() {
        this.topicControl.rePaintCode();
    }
    //To be called from some other component to log the current text code
    onCheck() {
        console.log(this.codeText);
    }
};
__decorate([
    Input()
], CodeDisplayComponent.prototype, "codeText", void 0);
CodeDisplayComponent = __decorate([
    Component({
        selector: 'app-code-display',
        templateUrl: './code-display.component.html',
        styleUrls: ['./code-display.component.css'],
    })
], CodeDisplayComponent);
export { CodeDisplayComponent };
//# sourceMappingURL=code-display.component.js.map