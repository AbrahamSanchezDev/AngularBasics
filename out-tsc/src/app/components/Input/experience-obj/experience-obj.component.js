import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ExpObjModule } from 'src/app/model/exp-obj/exp-obj.module';
let ExperienceObjComponent = class ExperienceObjComponent {
    constructor(downloadTool) {
        this.downloadTool = downloadTool;
        this.expObj = new ExpObjModule();
    }
    ngOnInit() { }
    //Create the ExpObj description and save it as json
    createExp(theText) {
        let theTextInArray = this.multiLineText.generateText();
        this.expObj.description = theTextInArray;
        this.downloadTool.DownloadTextToFileAsJson(this.expObj, theText);
    }
};
__decorate([
    ViewChild('multiText')
], ExperienceObjComponent.prototype, "multiLineText", void 0);
ExperienceObjComponent = __decorate([
    Component({
        selector: 'app-experience-obj',
        templateUrl: './experience-obj.component.html',
        styleUrls: ['./experience-obj.component.css'],
    })
], ExperienceObjComponent);
export { ExperienceObjComponent };
//# sourceMappingURL=experience-obj.component.js.map