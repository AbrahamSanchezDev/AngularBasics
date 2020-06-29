import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DownloadToolService = class DownloadToolService {
    constructor(http) {
        this.http = http;
        this.a = document.createElement('a');
    }
    //This creates a json file with the given data
    DownloadTextToFileAsJson(theText, fileName) {
        if (theText == null) {
            console.log('No Data');
            return;
        }
        var blob = new Blob([JSON.stringify(theText, null, 2)], {
            type: 'application/json',
        });
        var url = window.URL.createObjectURL(blob);
        this.a.href = url;
        this.a.download = fileName + '.json';
        this.a.click();
        window.URL.revokeObjectURL(url);
    }
};
DownloadToolService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DownloadToolService);
export { DownloadToolService };
//# sourceMappingURL=download-tool.service.js.map