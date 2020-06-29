import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainComponent = class MainComponent {
    constructor(topicsServer) {
        this.topicsServer = topicsServer;
        this.title = 'Angular Basics';
        topicsServer.onSearch.subscribe((text) => {
            this.getTopics(text);
        });
        topicsServer.onSelected.subscribe((topic) => {
            this.onDisplayTopic(topic);
        });
    }
    //On Init get the topic
    ngOnInit() {
        this.getTopics();
    }
    //Get the topics if no text given if not then do a custom search
    getTopics(text) {
        if (text == null || text == '') {
            this.topics = this.topicsServer.getJsonData();
            this.currentTopics = this.topics;
            return;
        }
        this.topics = this.topicsServer.getData(text);
        this.currentTopics = this.topics;
    }
    //Don't display any topic when displaying one
    onDisplayTopic(topic) {
        if (topic == null) {
            this.topics = this.currentTopics;
            return;
        }
        this.topics = null;
    }
};
MainComponent = __decorate([
    Component({
        selector: 'app-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.css'],
    })
], MainComponent);
export { MainComponent };
//# sourceMappingURL=main.component.js.map