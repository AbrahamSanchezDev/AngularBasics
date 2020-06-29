import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
let TopicSimpleCreatorComponent = class TopicSimpleCreatorComponent extends TopicCreatorBaseComponent {
    constructor(downloadTool, topicControlServer, dialog) {
        super(downloadTool);
        this.downloadTool = downloadTool;
        this.topicControlServer = topicControlServer;
        this.dialog = dialog;
    }
    ngOnInit() { }
    updateFromTopic() {
        this.title.myText = this.topic.title;
        this.descriptionField.myText = this.topic.description;
        this.mainTopic.content = this.topic.text;
    }
    //#region Load And Preview
    //Preview topic
    doPreview() {
        this.updateTopicData();
        if (this.topic.text != null && this.topic.text != '') {
            this.topic.text = this.topicControlServer.replaceTags(this.topic.text);
        }
        if (this.topic.title == '' && this.mainTopic.content == '') {
            this.errorText = 'Set Topic Title';
            return;
        }
        this.preview.topic = this.topic;
    }
    //On Selected imgs
    onChange(event) {
        let curFile = event.target.files[0];
        let totalImgs = event.target.files.length;
        if (totalImgs > 10) {
            totalImgs = 10;
        }
        for (let i = 0; i < totalImgs; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                var data = JSON.parse(reader.result);
                this.topic = data;
                this.updateFromTopic();
            };
            reader.readAsText(curFile);
        }
    }
    //#endregion
    //#region Testing
    //Fill data for testing
    testingData() {
        this.title.myText = 'Some nice title';
        this.descriptionField.myText = 'We are a description';
        this.mainTopic.content = `    
    `;
    }
};
__decorate([
    ViewChild('preview')
], TopicSimpleCreatorComponent.prototype, "preview", void 0);
TopicSimpleCreatorComponent = __decorate([
    Component({
        selector: 'app-topic-simple-creator',
        templateUrl: './topic-simple-creator.component.html',
        styleUrls: [
            './topic-simple-creator.component.css',
            '../Topic/topic-creator-base/topic-creator-base.component.css',
        ],
    })
], TopicSimpleCreatorComponent);
export { TopicSimpleCreatorComponent };
//# sourceMappingURL=topic-simple-creator.component.js.map