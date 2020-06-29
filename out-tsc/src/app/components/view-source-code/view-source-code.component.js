import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ViewSourceCodeComponent = class ViewSourceCodeComponent {
    constructor() { }
    ngOnInit() { }
    openLink() {
        window.open(this.link);
    }
};
__decorate([
    Input()
], ViewSourceCodeComponent.prototype, "link", void 0);
ViewSourceCodeComponent = __decorate([
    Component({
        selector: 'app-view-source-code',
        templateUrl: './view-source-code.component.html',
        styleUrls: ['./view-source-code.component.css'],
    })
], ViewSourceCodeComponent);
export { ViewSourceCodeComponent };
//# sourceMappingURL=view-source-code.component.js.map