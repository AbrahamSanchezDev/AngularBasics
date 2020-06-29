import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let TextConfirmComponent = class TextConfirmComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() { }
    //Close the current dialog
    onNoClick() {
        this.dialogRef.close();
    }
    //Close the current dialog and pass the current value
    onEnter() {
        this.dialogRef.close(this.data);
    }
};
TextConfirmComponent = __decorate([
    Component({
        selector: 'app-text-confirm',
        templateUrl: './text-confirm.component.html',
        styleUrls: ['./text-confirm.component.css'],
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], TextConfirmComponent);
export { TextConfirmComponent };
//# sourceMappingURL=text-confirm.component.js.map