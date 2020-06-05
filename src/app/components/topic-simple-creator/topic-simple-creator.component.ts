import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { TopicObjModule } from 'src/app/model/topic-obj/topic-obj.module';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TextConfirmComponent } from '../Input/text-confirm/text-confirm.component';
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

    if (this.topic.title == '') {
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
  //Set the selected text to be an img
  setToImg(): void {
    const dialogRef = this.dialog.open(TextConfirmComponent, {
      width: '700px',
      data: {
        title: 'Add Img',
        content: [
          {
            text: 'Imgs Link:',
            value: '',
          },
          {
            text: 'Display if not found:',
          },
          {
            text: 'Press Ok To Add',
            type: 'p',
          },
        ],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != null && result.content[0].value != '') {
        console.log('Adding text');

        this.mainTopic.content = this.topicControlServer.addImg(
          this.mainTopic.content,
          result.content[0].value,
          result.content[1].value,
          this.mainTopic.theText
        );
      }
    });

    // let selected = window.getSelection();
    // if (!selected.toString()) {
    //   return;
    // }
    // this.mainTopic.content = this.topicControlServer.setToImg(
    //   this.mainTopic.content,
    //   selected.toString()
    // );
  }
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
