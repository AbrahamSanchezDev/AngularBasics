import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';

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

  testingAtm: boolean = false;

  constructor(
    protected downloadTool: DownloadToolService,
    private topicControlServer: TopicControlService
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
    let selected = window.getSelection();
    if (!selected.toString()) {
      return;
    }
    this.mainTopic.content = this.topicControlServer.setToImg(
      this.mainTopic.content,
      selected.toString()
    );
  }
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
    this.title.myText = 'The Nice title';
    this.descriptionField.myText = 'We are a description';
    this.mainTopic.content = `this is the Img:
    <img src="https://scotch-res.cloudinary.com/image/upload/w_1050,q_auto:good,f_auto/media/272/RbhNRo2DRWOFBC1KChrl_g2SameHeight.png.jpg" />
    
    now this should be code!
    <center><b> This is bold!</b></center>
    [code]
    doPreview(): void {
      this.updateTopicData();
      console.log(this.topic.text);
  
      this.replaceTags();
  
      console.log(this.topic.text);
  
      this.preview.topic = this.topic;
    }
    [/code]
    
    some other code


    [code]
    //Replace the text for a new one
    replaceText(text: string, original: string, newText: string): string {
      // var newText = text.replace(original, newText);
      var newText = text.replace(new RegExp(original, 'gi'), newText);
      return newText;
    }
    [/code]


    https://profile.es/pro/wp-content/media/directivas-de-angular-programaci%C3%B3n.jpg
    `;
  }
}
