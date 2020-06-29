import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';
let HowToDisplayComponent = class HowToDisplayComponent {
    constructor(topicControl, sanitizer) {
        this.topicControl = topicControl;
        this.sanitizer = sanitizer;
        this.extraClass = 'mostTop';
        topicControl.onSelected.subscribe((topic) => this.onSelectedHowTo(topic));
        topicControl.onSearch.subscribe((text) => {
            this.onClose();
        });
    }
    //Repaint the display code
    ngAfterViewChecked() {
        this.topicControl.rePaintCode();
    }
    //Check if the topic is valid
    isValid() {
        return this.topic != null;
    }
    //Returns all the topic data in the current topic
    getContent() {
        return this.topic.content;
    }
    //Get topic text as trusted html
    getTopicText() {
        var saveHtml = this.sanitizer.bypassSecurityTrustHtml(this.topic.text);
        return saveHtml;
    }
    //Returns the text of the given topic
    getContentText(content) {
        if (content == null) {
            return '';
        }
        return content.text;
    }
    //Returns the content of the given topic
    getContentCode(content) {
        if (content == null) {
            return '';
        }
        return content.text;
    }
    //Returns the type of the given content and return it as string
    getType(content) {
        return TopicDataType[content.data];
    }
    //Called by the event onSelectedTopic and set this topic to the selected topic
    onSelectedHowTo(topic) {
        this.topic = topic;
    }
    //Called when the X button is pressed and set the current topic to null and send the event
    onClose() {
        this.topic = null;
        this.topicControl.onSelected.emit(this.topic);
    }
};
__decorate([
    Input()
], HowToDisplayComponent.prototype, "extraClass", void 0);
HowToDisplayComponent = __decorate([
    Component({
        selector: 'app-how-to-display',
        templateUrl: './how-to-display.component.html',
        styleUrls: ['./how-to-display.component.css'],
    })
], HowToDisplayComponent);
export { HowToDisplayComponent };
//# sourceMappingURL=how-to-display.component.js.map