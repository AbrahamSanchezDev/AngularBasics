import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
let TopicCreatorBaseComponent = class TopicCreatorBaseComponent {
    constructor(downloadTool) {
        this.downloadTool = downloadTool;
        this.errorText = '';
        this.topicName = 'Title';
        this.topicDescription = 'Description';
        this.introText = 'Intro / Main topic Text';
        this.topic = new TopicObjModule();
    }
    //Returns the type of the given content and return it as string
    getType(content) {
        return TopicDataType[content.data];
    }
    //Returns the text of the given topic
    getContentText(content) {
        if (content == null) {
            return '';
        }
        return content.text;
    }
    //Check for valid values and create the json file
    checkText() {
        this.errorText = '';
        if (this.title.myText == null || this.title.myText == '') {
            this.errorText = 'Please add a title';
            return;
        }
        this.updateTopicData();
        this.downloadAsJsonFile(this.topic, this.topic.title);
    }
    //Create the json file with the given data and the given file name
    downloadAsJsonFile(data, fileName) {
        this.downloadTool.DownloadTextToFileAsJson(data, fileName);
    }
    //Updates the values for the current topic
    updateTopicData() {
        this.topic.title = this.title.myText;
        this.topic.description = this.descriptionField.myText;
        this.topic.text = this.mainTopic.content;
    }
};
__decorate([
    ViewChild('titleField')
], TopicCreatorBaseComponent.prototype, "title", void 0);
__decorate([
    ViewChild('descriptionField')
], TopicCreatorBaseComponent.prototype, "descriptionField", void 0);
__decorate([
    ViewChild('mainTopic')
], TopicCreatorBaseComponent.prototype, "mainTopic", void 0);
TopicCreatorBaseComponent = __decorate([
    Component({
        selector: 'app-topic-creator-base',
        templateUrl: './topic-creator-base.component.html',
        styleUrls: ['./topic-creator-base.component.css'],
    })
], TopicCreatorBaseComponent);
export { TopicCreatorBaseComponent };
//# sourceMappingURL=topic-creator-base.component.js.map