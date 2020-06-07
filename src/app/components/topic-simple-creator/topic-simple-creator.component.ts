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

  //#region Tools
  //Shows a input pop up window with the given data
  showInsertInput(datas: InputData, onClose: Function) {
    const dialogRef = this.dialog.open(TextConfirmComponent, {
      width: '500px',
      data: datas,
    });
    //Subcribe to the event that is called when the pop up window is close
    dialogRef.afterClosed().subscribe((result) => {
      onClose(result);
    });
  }
  //Check if there is something selected
  checkSelected(onResult: Function): boolean {
    let selected = window.getSelection();
    if (!selected.toString()) {
      return false;
    }
    console.log(selected);

    onResult(selected.toString());
    return true;
  }
  //#region Code
  //Set the selected text to be an code
  setSelectedToCode(): void {
    this.checkSelected((selected: string) => {
      this.mainTopic.content = this.topicControlServer.setToCode(
        this.mainTopic.content,
        selected
      );
    });
  }
  //#endregion
  //#region Imgs
  //Set the selected text to be an img
  setSelectedToImage(): void {
    //Check if there is nothing selected and turn it to an image
    if (
      !this.checkSelected((selected) => {
        //Turn the selected text to a Image
        this.mainTopic.content = this.topicControlServer.replaceSelectedToImg(
          this.mainTopic.content,
          selected,
          this.mainTopic.theText
        );
        return;
      })
    )
      this.showInsertInput(this.imgData, (result) => this.onAddedImg(result));
  }
  //Add img with the given result to the text field
  onAddedImg(result: InputData) {
    //Check if the value is valid if so insert the img
    if (result != null && result.content[0].value != '') {
      this.mainTopic.content = this.topicControlServer.InsertImg(
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
    this.mainTopic.content = this.topicControlServer.replaceSelectedToLink(
      this.mainTopic.content,
      selected.toString(),
      this.mainTopic.theText
    );
  }
  //Add Link with the given result to the text field
  onAddedLink(result: InputData) {
    //Check if the value is valid if so insert the link
    if (result != null && result.content[0].value != '') {
      this.mainTopic.content = this.topicControlServer.insertLink(
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
  //#endregion

  updateFromTopic(): void {
    this.title.myText = this.topic.title;
    this.descriptionField.myText = this.topic.description;
    this.mainTopic.content = this.topic.text;
  }
  //#region Load And Preview
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
  //On Selected imgs
  onChange(event: any) {
    let curFile = event.target.files[0];
    let totalImgs = event.target.files.length;
    if (totalImgs > 10) {
      totalImgs = 10;
    }
    for (let i = 0; i < totalImgs; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        var data = JSON.parse((reader.result as unknown) as string);
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
  //#endregion
}
