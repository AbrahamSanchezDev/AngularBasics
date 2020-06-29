import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let HowToComponent = class HowToComponent {
    constructor(topicControl) {
        this.topicControl = topicControl;
    }
    ngOnInit() { }
    //Called on selected the topic event
    onSelect() {
        this.topicControl.onSelected.emit(this.topic);
    }
};
__decorate([
    Input()
], HowToComponent.prototype, "topic", void 0);
HowToComponent = __decorate([
    Component({
        selector: 'app-how-to',
        templateUrl: './how-to.component.html',
        styleUrls: ['./how-to.component.css'],
    })
], HowToComponent);
export { HowToComponent };
//# sourceMappingURL=how-to.component.js.map