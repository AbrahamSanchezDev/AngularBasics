import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicCreatorBaseComponent } from '../Topic/topic-creator-base/topic-creator-base.component';
import { HowToDisplayComponent } from '../how-to-display/how-to-display.component';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { TopicControlService } from 'src/app/server/topic/topic-control.service';
import { TopicDataType } from 'src/app/model/enum/topic-data-type.enum';

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

  testingAtm: boolean = true;

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
    this.mainTopic.content = `
    There are times when you want to display and array of variables been single data of stings or an array of objects and to do this the for loop is a good idea.

In this example there is an array of objects that have "someText" and "someId" in them
[code] 
//Ts file
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howto-for',
  templateUrl: './howto-for.component.html',
  styleUrls: ['./howto-for.component.css'],
})
export class HowtoForComponent implements OnInit {
  allTheObjs: any[] = [
    {
      someText: 'This is an obj text',
      someId: 1,
    },
    {
      someText: 'Hello world!',
      someId: 5,
    },
    {
      someText: 'Angular how to!',
      someId: 10,
    },
    {
      someText: 'And this would be the last text',
      someId: 15,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
[/code]
Codeeeee
[code]
 //Html

 <div *ngFor="let obj of allTheObjs">
   <h1>{{ obj.someText }}</h1>
   <p>This is the value : {{ obj.someId }}</p>
 </div>

[/code]

And this is how you would display them using for loop


<img src="https://i.imgur.com/ITaJWbJ.png"/>
    `;
    this.topic.content.push({
      data: TopicDataType.Code,
      text: `
       //Html
      <div>
      <div *ngFor="let obj of allTheObjs">
        <h1>{{ obj.someText }}</h1>
        <p>This is the value : {{ obj.someId }}</p>
      </div>
     </div>`,
    });
  }
}
