import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProjectPreviewComponent = class ProjectPreviewComponent {
    constructor() { }
    ngOnInit() { }
    //Open the project Link
    openLink() {
        window.open(this.project.link, '_blank');
    }
    //Check if the project data is valid
    valid() {
        return this.project != null;
    }
};
ProjectPreviewComponent = __decorate([
    Component({
        selector: 'app-project-preview',
        templateUrl: './project-preview.component.html',
        styleUrls: ['./project-preview.component.css'],
    })
], ProjectPreviewComponent);
export { ProjectPreviewComponent };
//# sourceMappingURL=project-preview.component.js.map