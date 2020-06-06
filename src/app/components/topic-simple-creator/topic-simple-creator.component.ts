import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { MatDialog } from '@angular/material/dialog';
import { TextConfirmComponent } from '../Input/text-confirm/text-confirm.component';
import { InputData } from 'src/app/model/inputs/input-data';

@Component({
  selector: 'app-topic-simple-creator',
  templateUrl: './topic-simple-creator.component.html',
  styleUrls: [
    './topic-simple-creator.component.css',
    '../Topic/topic-creator-base/topic-creator-base.component.css',
  ],
})
export class TopicSimpleCreatorComponent extends TopicCreatorBaseComponent
  implements OnInit {
  @ViewChild('preview') preview: HowToDisplayComponent;

  testingAtm: boolean /*= true*/;
  imgData: InputData = {
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
  linkData: InputData = {
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

  constructor(
    protected downloadTool: DownloadToolService,
    private topicControlServer: TopicControlService,
    public dialog: MatDialog
  ) {
    super(downloadTool);
  }

  ngOnInit(): void {}
  //Preview topic
  doPreview(): void {
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
  //Set the selected text to be an code
  setToCode(): void {
    let selected = window.getSelection();
    if (!selected.toString()) {
      return;
    }
    this.mainTopic.content = this.topicControlServer.setToCode(
      this.mainTopic.content,
      selected.toString()
    );
  }
  //#region Imgs

  //Set the selected text to be an img
  setToImg(): void {
    //Check if there is nothing selected and turn it to an image
    let selected = window.getSelection();
    if (!selected.toString()) {
      this.showInsertInput(this.imgData, (result) => this.onAddedImg(result));
      return;
    }
    //Turn the selected text to a Image
    this.mainTopic.content = this.topicControlServer.setToImg(
      this.mainTopic.content,
      selected.toString()
    );
  }
  //Add img with the given result to the text field
  onAddedImg(result: InputData) {
    //Check if the value is valid if so insert the img
    if (result != null && result.content[0].value != '') {
      this.mainTopic.content = this.topicControlServer.addImg(
        this.mainTopic.content,
        result.content[0].value,
        result.content[1].value,
        this.mainTopic.theText
      );
      //Reset the values for the next use
      result.content[0].value = null;
      result.content[1].value = null;
    }
  }
  //#endregion

  //Shows a input pop up window with the given data
  showInsertInput(datas: InputData, onClose: Function) {
    const dialogRef = this.dialog.open(TextConfirmComponent, {
      width: '500px',
      data: datas,
    });
    dialogRef.afterClosed().subscribe((result) => {
      onClose(result);
    });
  }
  //#region Link
  //Turn selected to link if not then show Insert link if there nothing select
  insertLink(): void {
    //Check if there is nothing selected
    let selected = window.getSelection();
    if (!selected.toString()) {
      this.showInsertInput(this.linkData, (result) => this.onAddedLink(result));
      return;
    }
    //Turn the selected text to a link
    this.mainTopic.content = this.topicControlServer.replaceToLink(
      this.mainTopic.content,
      selected.toString()
    );
  }
  //Add Link with the given result to the text field
  onAddedLink(result: InputData) {
    //Check if the value is valid if so insert the link
    if (result != null && result.content[0].value != '') {
      this.mainTopic.content = this.topicControlServer.setToLink(
        this.mainTopic.content,
        result.content[0].value,
        result.content[1].value,
        this.mainTopic.theText
      );
      //Reset the values for the next use
      result.content[0].value = null;
      result.content[1].value = null;
    }
  }
  //#endregion
  //Set the selected text to have the given tag
  setToTag(tagName: string): void {
    let selected = window.getSelection();
    if (!selected.toString()) {
      return;
    }
    this.mainTopic.content = this.topicControlServer.setToTag(
      this.mainTopic.content,
      tagName,
      selected.toString()
    );
  }
  //Fill data for testing
  testingData() {
    this.title.myText = 'Some nice title';
    this.descriptionField.myText = 'We are a description';
    this.mainTopic.content = `    
    `;
  }
  updateFromTopic(): void {
    this.title.myText = this.topic.title;
    this.descriptionField.myText = this.topic.description;
    this.mainTopic.content = this.topic.text;
  }
  //On Selected imgs
  onChange(event: any) {
    var curFile = event.target.files[0];
    let totalImgs = event.target.files.length;
    if (totalImgs > 10) {
      totalImgs = 10;
    }
    for (let i = 0; i < totalImgs; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        var topic = reader.result[0];
        var data = JSON.parse((reader.result as unknown) as string);
        this.topic = data;
        this.updateFromTopic();
      };
      reader.readAsText(curFile);
    }
  }
}
