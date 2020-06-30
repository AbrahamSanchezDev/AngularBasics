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
    public httpText: HtmlTextToolService
  ) {
    super(downloadTool);
  }

  ngOnInit(): void {}

  //#region Load And Preview
  //Preview topic
  doPreview(): void {
    this.updateTopicData();
    this.errorText = '';
    if (this.topic.title == '' && this.mainTopic.content == '') {
      this.errorText = 'Set Topic Title';
      return;
    }
    this.formatTopicText();
    this.preview.onSelectedHowTo(this.topic);
  }
  formatTopicText(): void {
    if (this.topic.text != null && this.topic.text != '') {
      this.topic.text = this.httpText.formatAllText(this.topic.text);
    }
  }
  //On Selected images
  onChange(event: any) {
    let curFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.topic = JSON.parse((reader.result as unknown) as string);
      this.updateFromTopic();
    };
    reader.readAsText(curFile);
  }

  //#endregion

  //#region Testing
  //Fill data for testing
  testingData() {
    this.title.myText = 'Some nice title';
    this.descriptionField.myText = 'We are a description';
    this.mainTopic.content = ` Content `;
  }
  //#endregion
}
