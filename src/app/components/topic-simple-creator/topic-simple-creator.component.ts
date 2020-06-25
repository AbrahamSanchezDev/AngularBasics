import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { MatDialog } from '@angular/material/dialog';
import { DownloadToolService } from 'src/app/service/tool/download-tool/download-tool.service';
import { HtmlTextToolService } from 'src/app/service/tool/html-tool/html-text-tool.service';

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
    public dialog: MatDialog,
    private httpText: HtmlTextToolService
  ) {
    super(downloadTool);
  }

  ngOnInit(): void {}

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
      this.topic.text = this.httpText.formatAllText(this.topic.text);
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
