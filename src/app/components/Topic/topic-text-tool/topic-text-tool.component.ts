import { Component, OnInit, Input } from '@angular/core';
import { InputMultilineComponent } from '../../Input/input-multiline/input-multiline.component';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { InputData } from 'src/app/model/inputs/input-data';
import { MatDialog } from '@angular/material/dialog';
import { TextConfirmComponent } from '../../Input/text-confirm/text-confirm.component';

@Component({
  selector: 'app-topic-text-tool',
  templateUrl: './topic-text-tool.component.html',
  styleUrls: ['./topic-text-tool.component.css'],
})
export class TopicTextToolComponent implements OnInit {
  @Input() mainTopic: InputMultilineComponent;

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
    private topicControlServer: TopicControlService,
    public dialog: MatDialog
  ) {}

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
  hasSomethingSelected(onResult: Function): boolean {
    let selected = window.getSelection();
    if (!selected.toString()) {
      return false;
    }
    onResult(selected.toString());
    return true;
  }
  //#region Code
  //Set the selected text to be an code
  setSelectedToCode(): void {
    this.hasSomethingSelected((selected: string) => {
      this.mainTopic.content = this.topicControlServer.setToCode(
        this.mainTopic.content,
        selected,
        this.mainTopic.theText
      );
    });
  }
  //#endregion
  //#region Imgs
  //Set the selected text to be an img
  setSelectedToImage(): void {
    //Check if there is something selected
    if (
      this.hasSomethingSelected((selected: string) => {
        //Turn the selected text to a Image
        this.mainTopic.content = this.topicControlServer.replaceSelectedToImg(
          this.mainTopic.content,
          selected,
          this.mainTopic.theText
        );
      })
    ) {
      return;
    }
    //Nothing was selected thus show the insert image ui
    this.showInsertInput(this.imgData, (result) => this.onAddedImg(result));
  }
  //Add img with the given result to the text field
  onAddedImg(result: InputData) {
    // Check if the value is valid if so insert the link
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
  setSelectedToLink(): void {
    //Check if there is nothing selected
    if (
      this.hasSomethingSelected((selected: string) => {
        //Turn the selected text to a link
        this.mainTopic.content = this.topicControlServer.replaceSelectedToLink(
          this.mainTopic.content,
          selected,
          this.mainTopic.theText
        );
      })
    ) {
      return;
    }
    //Nothing was selected thus show the insert link ui
    this.showInsertInput(this.linkData, (result) => this.onAddedLink(result));
  }
  //Add Link with the given result to the text field
  onAddedLink(result: InputData) {
    // Check if the value is valid if so insert the link
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
      selected.toString(),
      this.mainTopic.theText
    );
  }
  //#endregion
}
