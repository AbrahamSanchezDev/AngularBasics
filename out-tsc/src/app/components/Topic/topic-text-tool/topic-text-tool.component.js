import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { TextConfirmComponent } from '../../Input/text-confirm/text-confirm.component';
let TopicTextToolComponent = class TopicTextToolComponent {
    constructor(dialog, textTool) {
        this.dialog = dialog;
        this.textTool = textTool;
        this.imgData = {
            title: 'Add Image',
            content: [
                {
                    text: 'Imgs Link:',
                    value: '',
                },
                {
                    text: 'Display if not found:',
                },
            ],
        };
        this.linkData = {
            title: 'Add Link',
            content: [
                {
                    text: 'Link:',
                    value: '',
                },
                {
                    text: 'Display Text:',
                },
            ],
        };
    }
    ngOnInit() { }
    //Check if there is something selected
    hasSomethingSelected() {
        this.selected = window.getSelection();
        this.selectedText = '';
        if (!this.selected.toString()) {
            return false;
        }
        this.selectedText = this.selected.toString();
        return true;
    }
    //Shows a input pop up window with the given data
    showInsertInput(datas, onClose) {
        const dialogRef = this.dialog.open(TextConfirmComponent, {
            width: '500px',
            data: datas,
        });
        //Subcribe to the event that is called when the pop up window is close
        dialogRef.afterClosed().subscribe((result) => {
            onClose(result);
        });
    }
    //#region Set Selected to
    //Set the selected text to be an code
    setSelectedToCode() {
        if (this.hasSomethingSelected()) {
            this.mainTopic.content = this.textTool.setToCode(this.mainTopic.content, this.selectedText, this.mainTopic.theText);
        }
        else {
            console.log('nothing Selected');
        }
    }
    //Turn selected to link if not then show Insert link if there nothing select
    setSelectedToLink() {
        //Check if there is nothing selected
        if (this.hasSomethingSelected()) {
            //Turn the selected text to a link
            this.mainTopic.content = this.textTool.replaceSelectedToLink(this.mainTopic.content, this.selectedText, this.mainTopic.theText);
            return;
        }
        //Nothing was selected thus show the insert link ui
        this.showInsertInput(this.linkData, (result) => this.onAddedLink(result));
    }
    //Set the selected text to be an img
    setSelectedToImage() {
        //Check if there is something selected
        if (this.hasSomethingSelected()) {
            //Turn the selected text to a Image
            this.mainTopic.content = this.textTool.replaceSelectedToImg(this.mainTopic.content, this.selectedText, this.mainTopic.theText);
            return;
        }
        //Nothing was selected thus show the insert image ui
        this.showInsertInput(this.imgData, (result) => this.onAddedImg(result));
    }
    //Set the selected text to have the given tag
    setSelectedToTag(tagName) {
        if (this.hasSomethingSelected()) {
            this.mainTopic.content = this.textTool.setToTag(this.mainTopic.content, tagName, this.selectedText, this.mainTopic.theText);
        }
    }
    //#endregion
    //#region Insert
    //Add img with the given result to the text field
    onAddedImg(result) {
        // Check if the value is valid if so insert the link
        if (result != null && result.content[0].value != '') {
            this.mainTopic.content = this.textTool.InsertImg(this.mainTopic.content, result.content[0].value, result.content[1].value, this.mainTopic.theText);
            //Reset the values for the next use
            result.content[0].value = null;
            result.content[1].value = null;
        }
    }
    //Add Link with the given result to the text field
    onAddedLink(result) {
        // Check if the value is valid if so insert the link
        if (result != null && result.content[0].value != '') {
            this.mainTopic.content = this.textTool.insertLink(this.mainTopic.content, result.content[0].value, result.content[1].value, this.mainTopic.theText);
            //Reset the values for the next use
            result.content[0].value = null;
            result.content[1].value = null;
        }
    }
};
__decorate([
    Input()
], TopicTextToolComponent.prototype, "mainTopic", void 0);
TopicTextToolComponent = __decorate([
    Component({
        selector: 'app-topic-text-tool',
        templateUrl: './topic-text-tool.component.html',
        styleUrls: ['./topic-text-tool.component.css'],
    })
], TopicTextToolComponent);
export { TopicTextToolComponent };
//# sourceMappingURL=topic-text-tool.component.js.map