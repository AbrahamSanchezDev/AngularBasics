import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
let TopicCreatorComponent = class TopicCreatorComponent extends TopicCreatorBaseComponent {
    constructor(downloadTool, arraysTool) {
        super(downloadTool);
        this.downloadTool = downloadTool;
        this.arraysTool = arraysTool;
    }
    ngOnInit() { }
    //Add new Simple text to the topic
    addSimpleText() {
        this.addContent(TopicDataType.SimpleText);
    }
    //Add new Code tp the topic
    addCode() {
        this.addContent(TopicDataType.Code);
    }
    //Add new Img to the topic
    addImg() {
        this.addContent(TopicDataType.Img);
    }
    //Add content of the given type to the topic
    addContent(dataType, textToShow) {
        this.topic.content.push({ data: dataType, text: textToShow });
    }
    //Returns the content of the given topic
    getContentCode(content) {
        if (content == null) {
            console.log('Null Content');
            return '';
        }
        return content.text;
    }
    //Remove the given topic
    removeContent(content) {
        this.topic.content = this.topic.content.filter((t) => t !== content);
    }
    //Check if the up button should be displayed
    showUp(content) {
        return this.topic.content.indexOf(content) > 0;
    }
    //Check if the down button should be displayed
    showDown(content) {
        return this.topic.content.indexOf(content) < this.topic.content.length - 1;
    }
    //Move content up
    moveUp(content) {
        this.arraysTool.moveElementLeft(this.topic.content, content);
    }
    //Move content down
    moveDown(content) {
        this.arraysTool.moveElementRight(this.topic.content, content);
    }
    //Returns all the topic data in the current topic
    getContent() {
        return this.topic.content;
    }
};
TopicCreatorComponent = __decorate([
    Component({
        selector: 'app-topic-creator',
        templateUrl: './topic-creator.component.html',
        styleUrls: [
            './topic-creator.component.css',
            '../Topic/topic-creator-base/topic-creator-base.component.css',
        ],
    })
], TopicCreatorComponent);
export { TopicCreatorComponent };
//# sourceMappingURL=topic-creator.component.js.map