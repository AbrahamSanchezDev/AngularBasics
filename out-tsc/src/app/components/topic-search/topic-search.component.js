import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let TopicSearchComponent = class TopicSearchComponent {
    constructor(topicsServer) {
        this.topicsServer = topicsServer;
        this.butttonText = 'Search';
        this.tempText = 'Search Topic...';
        this.doingSearch = false;
    }
    ngOnInit() { }
    //Search the topic with the given text called by the AddTextComponent
    searchTopic(text) {
        if (text == undefined || text == '') {
            this.cancelSearch();
            return;
        }
        this.doingSearch = true;
        this.topicsServer.search(text);
    }
    //Returns if it's doing a search
    searching() {
        return this.doingSearch;
    }
    //Cancel current search
    cancelSearch() {
        this.doingSearch = false;
        this.topicsServer.search('');
        this.inputAddText.myText = '';
    }
};
__decorate([
    ViewChild('inputAddText')
], TopicSearchComponent.prototype, "inputAddText", void 0);
TopicSearchComponent = __decorate([
    Component({
        selector: 'app-topic-search',
        templateUrl: './topic-search.component.html',
        styleUrls: ['./topic-search.component.css'],
    })
], TopicSearchComponent);
export { TopicSearchComponent };
//# sourceMappingURL=topic-search.component.js.map