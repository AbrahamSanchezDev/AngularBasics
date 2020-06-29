import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor() {
        this.title = 'Title';
        this.cssClass = "header";
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], HeaderComponent.prototype, "title", void 0);
__decorate([
    Input()
], HeaderComponent.prototype, "cssClass", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map